const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ===== Helpers =====
function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}

// ===== Register =====
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(`data of body: ${name, email, password}`);

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({name, email, password: hashed });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Login =====
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Refresh Token =====
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: "No token" });

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ error: "Invalid refresh token" });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid refresh token" });
      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Logout =====
router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "No token" });

    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.json({ message: "✅ Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
