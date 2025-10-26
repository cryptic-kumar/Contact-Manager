// routes/analytics.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const analyticsController = require("../controllers/analyticsController");

// @route   GET api/analytics
// @desc    Get contact analytics
// @access  Private
router.get("/", authMiddleware, analyticsController.getAnalytics);

module.exports = router;
