// routes/auth.js

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

// @route   POST api/auth
// @desc    Log in a user & get token
// @access  Public
router.post(
  "/",
  [
    // Validation middleware for login
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.loginUser
);

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", authMiddleware, authController.getLoggedInUser);

module.exports = router;
