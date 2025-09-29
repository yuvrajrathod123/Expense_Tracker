const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Replace with your MongoDB URI
//const uri = "mongodb+srv://yuvrajrathod8772:xhcFHUns8DQY0VT5@personalproject.prwcnbt.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=PersonalProject";
const url = "mongodb+srv://yuvrajrathod8772:xhcFHUns8DQY0VT5@personalproject.prwcnbt.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=PersonalProject"

mongoose.connect(url)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
