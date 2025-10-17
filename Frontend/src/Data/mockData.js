// ============================================
// FILE: Data/mockData.js
// ============================================

// Mock data for demonstration
export const mockTransactions = [
  { id: 1, type: 'Income', mode: 'Bank Transfer', amount: 50, date: '2025-10-01', description: 'Salary', category: 'Salary' },
  { id: 2, type: 'Expense', mode: 'UPI', amount: 10, date: '2025-10-02', description: 'Groceries', category: 'Food' },
  { id: 3, type: 'Expense', mode: 'Card', amount: 80, date: '2025-10-03', description: 'Restaurant', category: 'Food' },
  { id: 4, type: 'Lend', mode: 'UPI', amount: 20, date: '2025-10-04', description: 'Lent to John', category: 'Lend', lendId: 'L001' },
  { id: 5, type: 'Expense', mode: 'Cash', amount: 50, date: '2025-10-05', description: 'Transport', category: 'Transport' },
  { id: 6, type: 'Repay', mode: 'UPI', amount: 10, date: '2025-10-06', description: 'Repayment from John', category: 'Repay', lendId: 'L001' },
  { id: 7, type: 'Income', mode: 'Wallet', amount: 30, date: '2025-10-07', description: 'Freelance work', category: 'Freelance' },
  { id: 8, type: 'Expense', mode: 'UPI', amount: 20, date: '2025-10-08', description: 'Rent', category: 'Housing' },
  { id: 9, type: 'Lend', mode: 'Bank Transfer', amount: 1500, date: '2025-09-20', description: 'Lent to Sarah', category: 'Lend', lendId: 'L002' },
  { id: 10, type: 'Repay', mode: 'UPI', amount: 10, date: '2025-09-28', description: 'Repayment from Sarah', category: 'Repay', lendId: 'L002' },
  { id: 11, type: 'Lend', mode: 'Cash', amount: 30, date: '2025-09-15', description: 'Lent to Mike', category: 'Lend', lendId: 'L003' },
  { id: 12, type: 'Expense', mode: 'Card', amount: 40, date: '2025-10-09', description: 'Shopping', category: 'Shopping' },
  { id: 13, type: 'Income', mode: 'Bank Transfer', amount: 20, date: '2025-10-10', description: 'Bonus', category: 'Bonus' },
];

export const lendRepayMapping = [
  { 
    lendId: 'L001', 
    person: 'John', 
    lentAmount: 2000, 
    lentDate: '2025-10-04', 
    repaidAmount: 1000, 
    repaidDate: '2025-10-06', 
    balance: 1000 
  },
  { 
    lendId: 'L002', 
    person: 'Sarah', 
    lentAmount: 1500, 
    lentDate: '2025-09-20', 
    repaidAmount: 1500, 
    repaidDate: '2025-09-28', 
    balance: 0 
  },
  { 
    lendId: 'L003', 
    person: 'Mike', 
    lentAmount: 3000, 
    lentDate: '2025-09-15', 
    repaidAmount: 0, 
    repaidDate: '-', 
    balance: 3000 
  },
  { 
    lendId: 'L004', 
    person: 'Emma', 
    lentAmount: 5000, 
    lentDate: '2025-09-01', 
    repaidAmount: 2500, 
    repaidDate: '2025-09-22', 
    balance: 2500 
  },
  {
  lendId: "L005",
  person: "Rohit",
  lentAmount: 2000,
  repaidAmount: 1000,
  balance: 1000,
  lentDate: "2025-10-01",
  repaidDate: "-",
  history: [
    { date: "2025-10-05", amount: 500 },
    { date: "2025-10-08", amount: 500 },
  ],
},
];