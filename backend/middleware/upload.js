const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ✅ FIXED STORAGE
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'blissbybena',
      format: file.mimetype.split('/')[1], // jpg/png
      public_id: Date.now() + '-' + file.originalname,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;