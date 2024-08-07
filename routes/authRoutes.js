const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/request-password-reset', authController.requestPasswordReset);
router.put('/reset-password/:token', authController.resetPassword);
router.post('/uploadAvatar', upload.single('avatar'), authController.uploadAvatar);


module.exports = router;
