// routes/contacts.js

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authMiddleware = require("../middleware/auth");
const contactController = require("../controllers/contactController");
const { upload } = require("../config/cloudinary");

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get("/", authMiddleware, contactController.getContacts);

// @route   POST api/contacts
// @desc    Create a new contact
// @access  Private
router.post(
  "/",
  [
    authMiddleware, // Run auth middleware first
    [
      // Then run validation
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").optional().isEmail(),
    ],
  ],
  contactController.createContact
);

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put("/:id", authMiddleware, contactController.updateContact);

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete("/:id", authMiddleware, contactController.deleteContact);

// @route   PUT api/contacts/:id/image
// @desc    Upload profile image for a contact
// @access  Private
router.put(
  "/:id/image",
  [
    authMiddleware,
    upload.single("profileImage"), // 'profileImage' is the field name
  ],
  contactController.uploadContactImage
);

module.exports = router;
