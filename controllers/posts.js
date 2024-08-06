import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const { content, media } = req.body;

  const post = new Post({
    user: req.user.id,
    content,
    media,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('user', 'name').populate('comments').sort({ createdAt: -1 });
  res.json(posts);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  post.content = req.body.content || post.content;
  post.media = req.body.media || post.media;

  const updatedPost = await post.save();
  res.json(updatedPost);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.remove();
  res.json({ message: 'Post removed' });
});

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
export const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.likes.includes(req.user.id)) {
    res.status(400);
    throw new Error('Post already liked');
  }

  post.likes.push(req.user.id);
  await post.save();

  res.json({ message: 'Post liked' });
});

// @desc    Unlike a post
// @route   PUT /api/posts/:id/unlike
// @access  Private
export const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (!post.likes.includes(req.user.id)) {
    res.status(400);
    throw new Error('Post not liked yet');
  }

  post.likes = post.likes.filter((like) => like.toString() !== req.user.id);
  await post.save();

  res.json({ message: 'Post unliked' });
});

// @desc    Share a post
// @route   PUT /api/posts/:id/share
// @access  Private
export const sharePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.shares.includes(req.user.id)) {
    res.status(400);
    throw new Error('Post already shared');
  }

  post.shares.push(req.user.id);
  await post.save();

  res.json({ message: 'Post shared' });
});
