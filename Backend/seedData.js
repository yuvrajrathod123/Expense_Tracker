const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ quiet: true });

const mongoose = require("mongoose");
const User = require("./src/models/User.js");
const Account = require("./src/models/Account.js");
const Category = require("./src/models/Category.js");
const Transaction = require("./src/models/Transaction.js");
const connectDB = require("./src/config/db.js");


async function seedData() {
  try {
    await connectDB();
    // Clear previous data
    await User.deleteMany();
    await Account.deleteMany();
    await Category.deleteMany();
    await Transaction.deleteMany();

    // Create Users
    const users = await User.insertMany([
      { name: "Yuvraj Rathod", email: "yuvraj@example.com", password: "hashed123" },
      { name: "Rohit Sharma", email: "rohit@example.com", password: "hashed456" },
    ]);

    // Create Accounts
    const accounts = await Account.insertMany([
      { name: "Cash", balance: 5000, user: users[0]._id },
      { name: "UPI", balance: 12000, user: users[0]._id },
      { name: "Wallet", balance: 2000, user: users[1]._id },
    ]);

    // Create Categories
    const categories = await Category.insertMany([
      { name: "Food", type: "expense", user: users[0]._id },
      { name: "Salary", type: "income", user: users[0]._id },
      { name: "Travel", type: "expense", user: users[1]._id },
    ]);

    // Create Transactions
    await Transaction.insertMany([
      {
        amount: 300,
        type: "expense",
        category: categories[0]._id,
        mode: accounts[0]._id,
        description: "Lunch at restaurant",
        balanceAfterTransaction: 4700,
        user: users[0]._id,
      },
      {
        amount: 20000,
        type: "income",
        category: categories[1]._id,
        mode: accounts[1]._id,
        description: "Monthly salary",
        balanceAfterTransaction: 32000,
        user: users[0]._id,
      },
      {
        amount: 500,
        type: "expense",
        category: categories[2]._id,
        mode: accounts[2]._id,
        description: "Cab fare",
        balanceAfterTransaction: 1500,
        user: users[1]._id,
      },
    ]);

    console.log("✅ Dummy data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    mongoose.connection.close();
  }
}

seedData();
