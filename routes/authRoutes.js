const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();


// ✅ Login Route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Logged in successfully!", user });
    });
  })(req, res, next);
});

// ✅ Check if User is Authenticated (Session)
router.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ authenticated: true, user: req.user });
  } else {
    return res.json({ authenticated: false });
  }
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
      console.log("Registering user:", { username, email }); // Log the request data
  
      let user = await User.findOne({ email });
      if (user) {
        console.log("Email already exists:", email); // Log duplicate email
        return res.status(400).json({ message: "Email already exists!" });
      }
  
      user = new User({ username, email, password });
      await user.save();
  
      console.log("User registered successfully:", user); // Log success
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Registration Error:", error); // Log the full error
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

// ✅ Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully!" });
  });
});

module.exports = router;
