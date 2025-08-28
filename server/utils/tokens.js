const jwt = require('jsonwebtoken')

// Access token: short-lived (e.g. 15m) → used for API requests.
const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5m' })

//Refresh token: long-lived (e.g. 7d or 30d) → used to request a new access token when the old one expires.
const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })

module.exports = { generateAccessToken, generateRefreshToken }