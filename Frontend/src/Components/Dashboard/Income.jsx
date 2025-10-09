import React from "react";
import { Plus, Download } from "lucide-react";

const Income = ({ incomes }) => (
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
              <td>{income.source}</td>
              <td>{income.category}</td>
              <td>{new Date(income.date).toLocaleDateString()}</td>
              <td className="income-amount">+${income.amount.toFixed(2)}</td>
              <td>{income.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Income;
