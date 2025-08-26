const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserByUsername } = require('../controllers/userController')

// Auth routes
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)

// User routes
router.get('/:username', getUserByUsername)

module.exports = router