const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// Route pour envoyer un message
router.post('/', authMiddleware, messageController.sendMessage);

// Route pour obtenir des messages d'une conversation spécifique
router.get('/:conversationId', authMiddleware, messageController.getMessages);

// Route pour obtenir tous les messages
router.get('/', authMiddleware, messageController.getAllMessages);

module.exports = router;
