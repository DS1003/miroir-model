<<<<<<< HEAD
<<<<<<< HEAD
=======
// routes/authRoutes.js

>>>>>>> 4a122c6 (version auth avec réinitialisation)
=======
>>>>>>> 5b7205a (feat: add auth as controller + routes)
import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forgotpassword', AuthController.forgotPassword);
router.put('/resetpassword/:resetToken', AuthController.resetPassword);

export default router;
