// ============================================
// FILE: views/DashboardView/DashboardView.jsx
// ============================================
import React from 'react';
import { DollarSign, TrendingUp, PieChart, FileText } from 'lucide-react';
import TransactionItem from '../../Components/TransactionItem/TransactionItem';
import StatCard from '../../Components/StatCard/StatCard';
import './DashboardView.css';

const DashboardView = ({ transactions, categories }) => {
  return (
    <div className="content-section">
      <h1 className="section-title">Dashboard Overview</h1>
      <div className="stats-grid">
        <StatCard icon={DollarSign} label="Total Expenses" value="$12,450.30" change="+12% from last month" type="expense" />
        <StatCard icon={TrendingUp} label="Total Income" value="$18,750.00" change="+8% from last month" type="income" />
        <StatCard icon={PieChart} label="Net Balance" value="$6,299.70" change="+5% from last month" type="balance" />
        <StatCard icon={FileText} label="Transactions" value="248" change="This month" type="transactions-icon" />
      </div>

      <div className="dashboard-grid">
        <div className="recent-section">
          <div className="section-header">
            <h2 className="section-subtitle">Recent Transactions</h2>
            <button className="btn-text">View All</button>
          </div>
          <div className="transaction-list">
            {transactions.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

        <div className="budget-section">
          <div className="section-header">
            <h2 className="section-subtitle">Budget Overview</h2>
            <button className="btn-text">Manage</button>
          </div>
          <div className="budget-list">
            {categories.slice(0, 4).map(category => (
              <div key={category.id} className="budget-item">
                <div className="budget-header">
                  <div className="budget-info">
                    <div className="category-dot" style={{ backgroundColor: category.color }}></div>
                    <span className="budget-name">{category.name}</span>
                  </div>
                  <span className="budget-amount">${category.spent} / ${category.budget}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${(category.spent / category.budget) * 100}%`,
                      backgroundColor: category.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;