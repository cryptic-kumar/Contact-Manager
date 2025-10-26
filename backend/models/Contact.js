// models/Contact.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  // This creates a relationship between this contact and a user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Refers to the 'user' model we created
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  group: {
    type: String,
    default: "Personal", // e.g., 'Personal' or 'Work'
  },
  profileImage: {
    type: String, // This will be the URL from Cloudinary
    default: null,
  },
  profileImagePublicId: {
    type: String, // This is the ID used to delete the image from Cloudinary
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contact", ContactSchema);
