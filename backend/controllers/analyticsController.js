// controllers/analyticsController.js

const Contact = require("../models/Contact");
const mongoose = require("mongoose");

// @desc    Get contact analytics for the dashboard
exports.getAnalytics = async (req, res) => {
  try {
    // 1. Get Total Contacts
    const totalContacts = await Contact.countDocuments({ user: req.user.id });

    // 2. Get Contacts by Group
    const contactsByGroup = await Contact.aggregate([
      {
        // Find only contacts belonging to this user
        $match: { user: new mongoose.Types.ObjectId(req.user.id) },
      },
      {
        // Group them by the 'group' field and sum them up
        $group: {
          _id: "$group", // The field to group by
          count: { $sum: 1 }, // The count for each group
        },
      },
      {
        // Optional: Sort by count descending
        $sort: { count: -1 },
      },
    ]);

    // 3. Send the response
    res.json({
      totalContacts,
      contactsByGroup,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
