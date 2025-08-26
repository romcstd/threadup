const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateAccessToken } = require('../utils/tokens')

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
    token: generateAccessToken(user._id),
  })
})

// Access Public | route: POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    token: generateAccessToken(user._id),
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

module.exports = {
  registerUser,
  loginUser,
  getUserByUsername,
}