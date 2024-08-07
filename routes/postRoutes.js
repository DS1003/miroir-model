const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware d'authentification

// Routes pour les posts
router.post('/', authMiddleware, postController.createPost);
router.get('/', authMiddleware, postController.getPosts);

// Routes pour les commentaires


router.get('/', postController.getPosts);
router.post('/', authMiddleware, postController.createPost);
router.put('/', authMiddleware, postController.updatePost);
router.delete('/', authMiddleware, postController.deletePost);
router.post('/comment', authMiddleware, postController.addComment);
router.put('/comment', authMiddleware, postController.updateComment);
router.delete('/comment', authMiddleware, postController.deleteComment);
router.post('/like', authMiddleware, postController.likePost);
router.post('/unlike', authMiddleware, postController.unlikePost);
router.post('/likecomment', authMiddleware, postController.likeComment);
router.post('/unlikecomment', authMiddleware, postController.unlikeComment);



module.exports = router;
