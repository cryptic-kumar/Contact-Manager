// config/cloudinary.js

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "contact-manager", // A folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg"],
    // Transformation to resize images (optional)
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// Create the Multer upload instance
const upload = multer({ storage: storage });

// Export both cloudinary and upload
module.exports = {
  cloudinary,
  upload,
};
