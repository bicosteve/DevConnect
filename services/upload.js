const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const keys = require('../config/keys');

cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryApiKey,
  api_secret: keys.cloudinarySecret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'app',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

const upload = multer({ storage });

module.exports = upload;
