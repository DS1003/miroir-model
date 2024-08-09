const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/request-password-reset', authController.requestPasswordReset);
router.put('/reset-password/:token', authController.resetPassword);
router.post('/uploadAvatar', upload.single('avatar'), authController.uploadAvatar);
router.post('/follow', authMiddleware, authController.followUser);
router.post('/unfollow', authMiddleware, authController.unfollowUser);
router.post('/block/:userId', authMiddleware, authController.blockUser);
router.post('/unblock/:userId', authMiddleware, authController.unblockUser);

module.exports = router;
