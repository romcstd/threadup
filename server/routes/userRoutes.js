const express = require('express')
const router = express.Router()
const { registerUser, loginUser, refreshAccessToken, getUserByUsername, logoutUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// Auth routes
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.post('/auth/refresh', refreshAccessToken)
router.post('/auth/logout', logoutUser)

// User routes
router.get('/:username', getUserByUsername)

module.exports = router