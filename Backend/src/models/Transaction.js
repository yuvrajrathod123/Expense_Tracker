

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {type: Number,required: true,},
    type: {type: String, enum: ["income", "expense"], required: true, },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true,},
    mode: {type: mongoose.Schema.Types.ObjectId, ref: "Mode", required: true,},
    description: {type: String, trim: true,},
    date: {type: Date,default: Date.now,},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("Transaction", transactionSchema);

