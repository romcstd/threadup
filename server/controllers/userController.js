const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateAccessToken, generateRefreshToken } = require('../utils/tokens')

// helper to set refresh cookie
const setRefreshCookie = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (match JWT expiry)
  })
}

// Access Public | route: POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body

  if (!name || !username || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    res.status(400)
    throw new Error('Username already taken')
  }

  const emailExists = await User.findOne({ email })
  if (emailExists) {
    res.status(400)
    throw new Error('Email already registered')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  })

  if (!user) {
    res.status(400)
    throw new Error('Invalid user data')
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    accessToken: generateAccessToken(user._id),
  })
})

// Access Public | route: POST /api/users/login
// LOGIN (issue access + refresh, store hashed refresh token)
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  const accessToken = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  // Hash refresh token before storing in DB
  user.refreshTokenHash = await bcrypt.hash(refreshToken, 10)
  await user.save()

  setRefreshCookie(res, refreshToken)

  res.status(200).json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    accessToken,
  })
})

const getUserByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select('-password')
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json(user)
})

// REFRESH (verify refresh JWT and hash, rotate tokens)
const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    res.status(401)
    throw new Error("No refresh token")
  }

  // verify JWT signature first
  let decoded
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  } catch (err) {
    res.status(403)
    throw new Error('Invalid or expired refresh token')
  }

  const user = await User.findById(decoded.id)
  if (!user || !user.refreshTokenHash) {
    res.status(403)
    throw new Error('Refresh token not found or user not found')
  }

  // compare provided token with stored hash
  const match = await bcrypt.compare(refreshToken, user.refreshTokenHash)
  if (!match) {
    // possible token reuse/stolen token — revoke all sessions for this user
    user.refreshTokenHash = null
    await user.save()
    res.status(403)
    throw new Error('Refresh token mismatch (possible reuse). Logged out.')
  }

  // token is valid and matches DB => rotate: issue new access + refresh
  const newAccessToken = generateAccessToken(user._id)
  const newRefreshToken = generateRefreshToken(user._id)

  // store new hashed refresh token (rotate)
  user.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10)
  await user.save()

  // set new cookie
  setRefreshCookie(res, newRefreshToken)

  res.json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    accessToken: newAccessToken,
  });
})

// LOGOUT (invalidate refresh token server-side and clear cookie)
const logoutUser = asyncHandler(async (req, res) => {

  // attempt to remove refresh token from DB for the user (if cookie present decode to get id)
  const refreshToken = req.cookies.refreshToken
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      const user = await User.findById(decoded.id)
      if (user) {
        user.refreshTokenHash = null
        await user.save()
      }
    } catch (err) {
      // ignore errors; still clear cookie
    }
  }
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production'
  })
  res.json({ message: "Logged out" })
})

module.exports = {
  registerUser,
  loginUser,
  getUserByUsername,
  refreshAccessToken,
  logoutUser,
}