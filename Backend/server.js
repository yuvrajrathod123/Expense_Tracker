const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./src/config/db"); 
require("dotenv").config({ quiet: true });


const User = require("./src/models/User.js");
const Account = require("./src/models/Account.js");
const Category = require("./src/models/Category.js");
const Transaction = require("./src/models/Transaction.js");


const authRoutes = require("./src/routes/auth.js");
const authMiddleware = require("./src/middleware/auth");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// environment variables
const PORT = process.env.PORT || 3000;


// =================================== API =======================================

// Authentication routes
app.use("/auth", authRoutes);

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// ✅ USER APIs
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ CATEGORY APIs
app.post("/api/categories", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/categories", async (req, res) => {
  const categories = await Category.find().populate("user");
  res.json(categories);
});

// ✅ ACCOUNT APIs
app.post("/api/accounts", async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/accounts", async (req, res) => {
  const accounts = await Account.find().populate("user");
  res.json(accounts);
});

// ✅ TRANSACTION APIs
app.post("/api/transactions", async (req, res) => {
  try {
    const { amount, type, category, mode, description, user } = req.body;

    // Find account (mode)
    const account = await Account.findById(mode);
    if (!account) return res.status(400).json({ error: "Invalid account" });

    // Adjust account balance
    if (type === "income") {
      account.balance += amount;
    } else if (type === "expense") {
      account.balance -= amount;
    }

    await account.save();

    // Create transaction
    const transaction = new Transaction({
      amount,
      type,
      category,
      mode,
      description,
      user,
      balanceAfterTransaction: account.balance,
    });

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find()
    .populate("category")
    .populate("mode")
    .populate("user");
  res.json(transactions);
});


// Example protected route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}`, user: req.user });
});













// ===========================================================
// connect DB first, then start server
(async () => {
  const connected = await connectDB();
  if (connected) {
    app.listen(PORT, () => {
      console.log(`🚀 ----------------------Server running on port ${PORT}----------------------`);
    });
  }
})();
