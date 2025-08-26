const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const User = require('../models/userModel');

// @desc    Get all posts (public)
// @route   GET /api/posts/all
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate('user', 'name username email')
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(posts)
})

const getPostsByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const posts = await Post.find({ user: user._id })
    .populate('user', 'name username')
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(posts);
});

// @desc    Get user's posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id })
    .populate('user', 'name username')
    .sort({ createdAt: -1 })
    .lean();
  res.status(200).json(posts)
})

// @desc    Set post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body
  if (!content || !content.trim()) {
    res.status(400)
    throw new Error('Please fill in all the fields')
  }

  const post = await Post.create({
    content: req.body.content,
    user: req.user.id
  })

  res.status(200).json(post)
})

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPost)
})

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await Post.findByIdAndDelete(req.params.id)

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getAllPosts,
  getPostsByUsername,
  getPosts,
  createPost,
  updatePost,
  deletePost,
}