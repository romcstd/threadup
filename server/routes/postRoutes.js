const express = require('express')
const router = express.Router()
const { getAllPosts, getPosts, createPost, updatePost, deletePost, } = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')

// Public route for getting all posts
router.route('/all').get(getAllPosts)

// Protected routes
router.route('/').get(protect, getPosts).post(protect, createPost)
router.route('/:id').delete(protect, deletePost).put(protect, updatePost)

module.exports = router