// ============================================
// FILE: views/ExpensesView/ExpensesView.jsx
// ============================================
import React from 'react';
import { Filter, Plus } from 'lucide-react';
import './ExpensesView.css';

const ExpensesView = ({ expenses }) => {
  return (
    <div className="content-section">
      <div className="page-header">
        <div>
          <h1 className="section-title">Expenses Management</h1>
          <p className="section-description">Track and manage all your expenses in one place.</p>
        </div>
        <div className="action-buttons">
          <button className="btn-secondary"><Filter size={18} /> Filter</button>
          <button className="btn-primary"><Plus size={18} /> Add Expense</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td className="font-medium">{expense.name}</td>
                <td><span className="badge">{expense.category}</span></td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td className="expense-amount">-${expense.amount.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${expense.status.toLowerCase()}`}>
                    {expense.status}
                  </span>
                </td>
                <td>
                  {expense.recurring ? (
                    <span className="badge-recurring">Recurring</span>
                  ) : (
                    <span className="badge-onetime">One-time</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesView;
