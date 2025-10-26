// server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Init Middleware
// This allows us to accept JSON data in the request body
app.use(express.json({ extended: false }));
// Enable CORS
app.use(cors());

// A simple test route
app.get("/", (req, res) => {
  res.send("Contact Manager API Running");
});

// --- Define Routes ---
// We will create these files in the next steps
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
