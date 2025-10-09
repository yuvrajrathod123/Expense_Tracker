import React from "react";
import { DollarSign, TrendingUp, TrendingDown, FileText, PieChart } from "lucide-react";
import '../Dashboard.css'

const DashboardOverview = ({ transactions, categories }) => {
  return (
    <div className="content-section">
      <h1 className="section-title">Dashboard Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon expense"><DollarSign size={24} /></div>
          <div className="stat-info">
            <p className="stat-label">Total Expenses</p>
            <h3 className="stat-value">$12,450.30</h3>
            <span className="stat-change negative">+12% from last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon income"><TrendingUp size={24} /></div>
          <div className="stat-info">
            <p className="stat-label">Total Income</p>
            <h3 className="stat-value">$18,750.00</h3>
            <span className="stat-change positive">+8% from last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon balance"><PieChart size={24} /></div>
          <div className="stat-info">
            <p className="stat-label">Net Balance</p>
            <h3 className="stat-value">$6,299.70</h3>
            <span className="stat-change positive">+5% from last month</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="recent-section">
          <h2>Recent Transactions</h2>
          <div className="transaction-list">
            {transactions.map(tx => (
              <div key={tx.id} className="transaction-item">
                <div>{tx.name}</div>
                <div>{tx.type}</div>
                <div>{new Date(tx.date).toLocaleDateString()}</div>
                <div>{tx.amount > 0 ? "+" : "-"}${Math.abs(tx.amount)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="budget-section">
          <h2>Budget Overview</h2>
          <div className="budget-list">
            {categories.map(cat => (
              <div key={cat.id} className="budget-item">
                <span>{cat.name}</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(cat.spent / cat.budget) * 100}%`,
                      backgroundColor: cat.color,
                    }}
                  ></div>
                </div>
                <span>${cat.spent} / ${cat.budget}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
