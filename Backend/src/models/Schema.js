// Enhanced User Schema
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  currency: { type: String, default: "INR" },
  monthlyBudget: { type: Number, default: 0 },
  settings: {
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    notifications: { type: Boolean, default: true },
    language: { type: String, default: "en" }
  }
}, { timestamps: true });
module.exports = mongoose.model("User", userSchema);

// Enhanced Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  icon: { type: String, default: "📁" }, // emoji or icon name
  color: { type: String, default: "#6366f1" }, // hex color
  budget: { type: Number, default: 0 }, // monthly budget for this category
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model("Category", categorySchema);

// Enhanced Account Schema (Payment Modes)
const accountSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Cash, UPI, Credit Card, etc.
  type: { 
    type: String, 
    enum: ["cash", "bank", "wallet", "card"], 
    required: true 
  },
  balance: { type: Number, default: 0 },
  initialBalance: { type: Number, default: 0 }, // starting balance
  accountNumber: { type: String }, // for bank accounts
  cardLastFour: { type: String }, // for cards
  icon: { type: String, default: "💳" },
  color: { type: String, default: "#10b981" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model("Account", accountSchema);

// Enhanced Transaction Schema
const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense", "transfer"], required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category", 
    required: function() { return this.type !== 'transfer'; }
  },
  mode: { // Source account
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Account", 
    required: true 
  },
  toAccount: { // For transfers
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Account" 
  },
  description: { type: String, trim: true, required: true },
  date: { type: Date, default: Date.now },
  balanceAfterTransaction: { type: Number, required: true },
  tags: [{ type: String }], // for better organization
  location: { type: String }, // where the transaction happened
  receipt: { type: String }, // file path or URL
  notes: { type: String }, // additional notes
  recurringId: { type: mongoose.Schema.Types.ObjectId, ref: "RecurringTransaction" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Index for better query performance
transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, category: 1 });
module.exports = mongoose.model("Transaction", transactionSchema);

// New: Budget Schema
const budgetSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  amount: { type: Number, required: true },
  period: { type: String, enum: ["weekly", "monthly", "yearly"], default: "monthly" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  spent: { type: Number, default: 0 }, // calculated field
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  alerts: {
    at50Percent: { type: Boolean, default: true },
    at80Percent: { type: Boolean, default: true },
    atLimit: { type: Boolean, default: true }
  }
}, { timestamps: true });
module.exports = mongoose.model("Budget", budgetSchema);

// New: Recurring Transaction Schema
const recurringTransactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  mode: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  frequency: { 
    type: String, 
    enum: ["daily", "weekly", "monthly", "yearly"], 
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // optional, for limited recurring
  lastProcessed: { type: Date },
  nextDue: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model("RecurringTransaction", recurringTransactionSchema);

// New: Goals Schema
const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  targetDate: { type: Date, required: true },
  category: { type: String, required: true }, // Vacation, Emergency, etc.
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model("Goal", goalSchema);



