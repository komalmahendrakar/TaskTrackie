const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authMiddleware = async (req, res, next) => {
  console.log("Cookies received:", req.cookies);

  const token = req.cookies.TaskiToken;

  try {
    // If no token is found, return an error for new user
    if (!token) {
      return res.status(401).json({ error: "No token provided, please log in." });
    }
    

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    // Find the user by decoded ID
    const user = await User.findById(decoded.id);

    if (!user) {

      return res.status(404).json({ message: "User not found." });
    }

    // Optionally, refresh the token if needed, otherwise you can skip this.
    res.cookie("TaskiToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
      sameSite: "Lax",                   // <— MUST be None
      secure: false                       // <— MUST be false on localhost
    });
    
    // Attach user to the request object for further use
    req.user = user;
console.log("Token found:", token);
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ message: "Invalid token, authentication failed." });
  }
};

module.exports = authMiddleware;
