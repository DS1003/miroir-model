const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, conversationController.createConversation);
router.get('/', authMiddleware, conversationController.getConversations);

module.exports = router;