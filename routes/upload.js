import express from 'express';
import { uploadMedia } from '../controllers/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, uploadMedia);

export default router;
