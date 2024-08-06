import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a comment
// @route   POST /api/posts/:postId/comments
// @access  Private
export const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comment = new Comment({
    user: req.user.id,
    post: req.params.postId,
    content,
  });

  const createdComment = await comment.save();
  post.comments.push(createdComment._id);
  await post.save();

  res.status(201).json(createdComment);
});

// @desc    Delete a comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await comment.remove();

  const post = await Post.findById(req.params.postId);
  post.comments = post.comments.filter((commentId) => commentId.toString() !== req.params.commentId);
  await post.save();

  res.json({ message: 'Comment removed' });
});
