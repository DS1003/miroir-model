import asyncHandler from 'express-async-handler';
import upload from '../middleware/upload.js';

// @desc    Upload media
// @route   POST /api/upload
// @access  Private
export const uploadMedia = asyncHandler((req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400);
      throw new Error(err);
    } else {
      if (req.file === undefined) {
        res.status(400);
        throw new Error('No file selected');
      } else {
        res.json({
          media: `/uploads/${req.file.filename}`,
        });
      }
    }
  });
});
