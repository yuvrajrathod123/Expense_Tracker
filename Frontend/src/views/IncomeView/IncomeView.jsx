// ============================================
// FILE: views/IncomeView/IncomeView.jsx
// ============================================
import React from 'react';
import { Download, Plus } from 'lucide-react';
import './IncomeView.css';

const IncomeView = ({ incomes }) => {
  return (
    <div className="content-section">
      <div className="page-header">
        <div>
          <h1 className="section-title">Income Tracking</h1>
          <p className="section-description">Monitor your income sources and revenue streams.</p>
        </div>
        <div className="action-buttons">
          <button className="btn-secondary"><Download size={18} /> Export</button>
          <button className="btn-primary"><Plus size={18} /> Add Income</button>
        </div>
      </div>

      <div className="income-summary">
        <div className="summary-card">
          <span className="summary-label">Total Income (This Month)</span>
          <h2 className="summary-value income-color">$7,670.00</h2>
        </div>
        <div className="summary-card">
          <span className="summary-label">Average Income</span>
          <h2 className="summary-value">$1,917.50</h2>
        </div>
        <div className="summary-card">
          <span className="summary-label">Income Sources</span>
          <h2 className="summary-value">4</h2>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map(income => (
              <tr key={income.id}>
                <td className="font-medium">{income.source}</td>
                <td><span className="badge">{income.category}</span></td>
                <td>{new Date(income.date).toLocaleDateString()}</td>
                <td className="income-amount">+${income.amount.toFixed(2)}</td>
                <td>
                  <span className="status-badge received">{income.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeView;