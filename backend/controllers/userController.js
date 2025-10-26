// controllers/userController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator"); // <-- IMPORTED

exports.registerUser = async (req, res) => {
  // --- This is the new validation block ---
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // --- End of new block ---

  // 1. Get name, email, and password from the request body
  const { name, email, password } = req.body;

  try {
    // 2. Check if a user with this email already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 3. If not, create a new user instance
    user = new User({
      name,
      email,
      password,
    });

    // 4. Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(password, salt); // Create the hash

    // 5. Save the user to the database
    await user.save();

    // 6. Create the JWT payload
    const payload = {
      user: {
        id: user.id, // The user's unique ID from the database
      },
    };

    // 7. Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30d" }, // Token expires in 30 days
      (err, token) => {
        if (err) throw err;
        // 8. Send the token back to the client
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
