const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary'); // Votre configuration Cloudinary

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'social_media', // Nom du dossier dans Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov', 'avi'],
  },
});

const upload = multer({ storage });

module.exports = upload;
