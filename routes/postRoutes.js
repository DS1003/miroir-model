const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware d'authentification

// Routes pour les posts
router.post('/', authMiddleware, postController.createPost);
router.get('/', authMiddleware, postController.getPosts);

// Routes pour les commentaires


router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getPosts);
router.post('/comment', authMiddleware, postController.addComment);
router.put('/', authMiddleware, postController.updatePost);
router.delete('/', authMiddleware, postController.deletePost);

module.exports = router;
