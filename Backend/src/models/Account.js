const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Cash, UPI, Wallet
  balance: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Account", accountSchema);
