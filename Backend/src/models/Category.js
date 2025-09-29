const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Food, Rent, Travel
  type: { type: String, enum: ["income", "expense"], required: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);

