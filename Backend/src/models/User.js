const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
  name: String,
  email: { type: String, unique: true },
  password: String, 
  refreshToken: { type: String } // store refresh token
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);


