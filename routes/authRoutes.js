// routes/authRoutes.js

import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forgotpassword', AuthController.forgotPassword);
router.put('/resetpassword/:resetToken', AuthController.resetPassword);

export default router;
