const express = require("express");
const bcrypt = require("bcryptjs");   // for password
const crypto = require("crypto");     // for refresh token
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();


const router = express.Router();

// ===== Helpers =====
function generateAccessToken(user) {
  console.log("seccret key:;;", process.env.JWT_SECRET)
  return jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id, name: user.name },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}

// ===== Register =====
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     console.log(`data of body: ${name, email, password}`);
//     // console.log("data of body:", { name, email, password });

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = new User({name, email, password: hashed });
//     await newUser.save();

//     res.status(201).json({ message: "✅ User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 4) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    // (optional) Generate tokens here if you want auto-login
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    newUser.refreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
    await newUser.save();

     //send refreshToken as cookie (more secure)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });


   res.status(201).json({
      message: "✅ User registered & logged in successfully",
      accessToken,
      refreshToken,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});


// ===== Login =====
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // save hashed refresh token
    user.refreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
    await user.save();

    // send refreshToken as cookie (more secure)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
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
