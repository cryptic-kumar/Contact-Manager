// routes/users.js

const express = require("express");
const router = express.Router();
const { check } = require("express-validator"); // Import check
const userController = require("../controllers/userController");

// @route   POST api/users
// @desc    Register a new user
// @access  Public
router.post(
  "/",
  [
    // --- Add this validation array ---
    check("name", "Please enter a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userController.registerUser
);

module.exports = router;
