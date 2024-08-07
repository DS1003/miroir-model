const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Chemin vers votre configuration Multer

// Routes pour les posts
router.get('/', postController.getPosts);
router.post('/', authMiddleware, upload.array('media', 10), postController.createPost);
router.put('/', authMiddleware, postController.updatePost);
router.delete('/', authMiddleware, postController.deletePost);

// Routes pour les commentaires

router.post('/comment', authMiddleware, postController.addComment);
router.put('/comment', authMiddleware, postController.updateComment);
router.delete('/comment', authMiddleware, postController.deleteComment);

// Routes pour les likes
router.post('/like', authMiddleware, postController.likePost);
router.post('/unlike', authMiddleware, postController.unlikePost);
router.post('/likecomment', authMiddleware, postController.likeComment);
router.post('/unlikecomment', authMiddleware, postController.unlikeComment);


module.exports = router;
