import express from 'express';
import { createPost, getPosts, updatePost, deletePost, likePost, unlikePost, sharePost } from '../controllers/posts.js';
import { createComment, deleteComment } from '../controllers/comments.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createPost)
  .get(protect, getPosts);

router.route('/:id')
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/like').put(protect, likePost);
router.route('/:id/unlike').put(protect, unlikePost);
router.route('/:id/share').put(protect, sharePost);

router.route('/:postId/comments')
  .post(protect, createComment);

router.route('/:postId/comments/:commentId')
  .delete(protect, deleteComment);

export default router;
v