// middleware/auth.js

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // 1. Get token from the request header
  const token = req.header("x-auth-token");

  // 2. Check if no token is present
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // 3. Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. If valid, attach the user's ID to the request object
    req.user = decoded.user;
    next(); // Move on to the next piece of middleware or the route handler
  } catch (err) {
    // 5. If not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};
