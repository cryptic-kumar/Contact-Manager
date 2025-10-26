// controllers/contactController.js

const { validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const { cloudinary } = require("../config/cloudinary");

// @desc    Get all contacts for the logged-in user
exports.getContacts = async (req, res) => {
  // Destructure query parameters from req.query
  const { page = 1, limit = 10, search = "", group = "" } = req.query;

  try {
    // --- Build Query ---
    // 1. Base filter: MUST belong to the logged-in user
    let filter = { user: req.user.id };

    // 2. Add search query (case-insensitive search on name and email)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // 3. Add group filter
    if (group) {
      filter.group = group;
    }
    // --- End Build Query ---

    // --- Pagination Logic ---
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    // --- End Pagination Logic ---

    // --- Execute Queries ---
    // 1. Get the contacts for the current page
    const contacts = await Contact.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNumber);

    // 2. Get the total count of contacts matching the filter
    const total = await Contact.countDocuments(filter);
    // --- End Execute Queries ---

    // --- Send Response ---
    res.json({
      contacts,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Create a new contact
exports.createContact = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, group } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      group,
      user: req.user.id, // Attach the user's ID
    });

    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Update an existing contact
exports.updateContact = async (req, res) => {
  const { name, email, phone, group } = req.body;

  // Build contact object based on fields that were submitted
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (group) contactFields.group = group;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // --- Security Check ---
    // Make sure the logged-in user owns this contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    // --- End Security Check ---

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true } // Return the updated document
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // --- Security Check ---
    // Make sure the logged-in user owns this contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    // --- End Security Check ---

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// @desc    Upload profile image for a contact
exports.uploadContactImage = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // --- Security Check ---
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // --- File Check ---
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // --- Delete old image from Cloudinary (if one exists) ---
    if (contact.profileImagePublicId) {
      await cloudinary.uploader.destroy(contact.profileImagePublicId);
    }

    // --- Update contact with new image details ---
    // 'req.file.path' is the secure URL from Cloudinary
    contact.profileImage = req.file.path;
    // 'req.file.filename' is the public_id
    contact.profileImagePublicId = req.file.filename;

    await contact.save();

    res.json(contact); // Send back the updated contact
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
