import React, { useState } from 'react';
import { Menu, X, Home, DollarSign, TrendingUp, PieChart, Settings, CreditCard, FileText, Users, Moon, Sun, Bell, Download, Filter, Plus, Search, Calendar, Tag, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(5);

  const transactions = [
    { id: 1, name: 'Office Supplies', category: 'Business', date: '2025-10-01', amount: -245.00, type: 'expense' },
    { id: 2, name: 'Client Payment - Web Design', category: 'Income', date: '2025-09-30', amount: 1500.00, type: 'income' },
    { id: 3, name: 'Software Subscription', category: 'Subscription', date: '2025-09-29', amount: -99.00, type: 'expense' },
    { id: 4, name: 'Grocery Shopping', category: 'Personal', date: '2025-09-28', amount: -156.50, type: 'expense' },
    { id: 5, name: 'Freelance Project', category: 'Income', date: '2025-09-27', amount: 850.00, type: 'income' }
  ];

  const expenses = [
    { id: 1, name: 'Office Rent', category: 'Business', date: '2025-09-01', amount: 1200.00, status: 'Paid', recurring: true },
    { id: 2, name: 'Electric Bill', category: 'Utilities', date: '2025-09-15', amount: 125.50, status: 'Paid', recurring: true },
    { id: 3, name: 'Internet Service', category: 'Utilities', date: '2025-09-10', amount: 79.99, status: 'Paid', recurring: true },
    { id: 4, name: 'Marketing Campaign', category: 'Marketing', date: '2025-09-20', amount: 450.00, status: 'Pending', recurring: false },
    { id: 5, name: 'Office Equipment', category: 'Business', date: '2025-09-22', amount: 890.00, status: 'Paid', recurring: false }
  ];

  const incomes = [
    { id: 1, source: 'Monthly Salary', category: 'Salary', date: '2025-09-25', amount: 5000.00, status: 'Received' },
    { id: 2, source: 'Freelance Web Design', category: 'Freelance', date: '2025-09-30', amount: 1500.00, status: 'Received' },
    { id: 3, source: 'Consulting Services', category: 'Consulting', date: '2025-09-18', amount: 850.00, status: 'Received' },
    { id: 4, source: 'Investment Returns', category: 'Investment', date: '2025-09-15', amount: 320.00, status: 'Received' }
  ];

  const categories = [
    { id: 1, name: 'Business', color: '#3b82f6', budget: 3000, spent: 2335, transactions: 15 },
    { id: 2, name: 'Food', color: '#f59e0b', budget: 800, spent: 645, transactions: 22 },
    { id: 3, name: 'Transport', color: '#8b5cf6', budget: 400, spent: 320, transactions: 18 },
    { id: 4, name: 'Utilities', color: '#10b981', budget: 500, spent: 385, transactions: 8 },
    { id: 5, name: 'Entertainment', color: '#ec4899', budget: 300, spent: 180, transactions: 12 },
    { id: 6, name: 'Healthcare', color: '#06b6d4', budget: 600, spent: 245, transactions: 5 }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Active', avatar: 'MJ' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Manager', status: 'Inactive', avatar: 'SW' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
    { id: 'income', label: 'Income', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'categories', label: 'Categories', icon: CreditCard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavigation = (viewId) => {
    setActiveView(viewId);
  };

  const renderContent = () => {
    switch(activeView) {
      case 'dashboard':
        return (
          <div className="content-section">
            <h1 className="section-title">Dashboard Overview</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon expense">
                  <DollarSign size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Total Expenses</p>
                  <h3 className="stat-value">$12,450.30</h3>
                  <span className="stat-change negative">+12% from last month</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon income">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Total Income</p>
                  <h3 className="stat-value">$18,750.00</h3>
                  <span className="stat-change positive">+8% from last month</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon balance">
                  <PieChart size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Net Balance</p>
                  <h3 className="stat-value">$6,299.70</h3>
                  <span className="stat-change positive">+5% from last month</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon transactions-icon">
                  <FileText size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Transactions</p>
                  <h3 className="stat-value">248</h3>
                  <span className="stat-change">This month</span>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="recent-section">
                <div className="section-header">
                  <h2 className="section-subtitle">Recent Transactions</h2>
                  <button className="btn-text">View All</button>
                </div>
                <div className="transaction-list">
                  {transactions.map(transaction => (
                    <div key={transaction.id} className="transaction-item">
                      <div className="transaction-left">
                        <div className={`transaction-icon ${transaction.type}`}>
                          {transaction.type === 'expense' ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                        </div>
                        <div className="transaction-details">
                          <span className="transaction-name">{transaction.name}</span>
                          <span className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="transaction-right">
                        <span className={`transaction-amount ${transaction.type}-amount`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                        <span className="transaction-category">{transaction.category}</span>
                      </div>
                    </div>
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

      case 'expenses':
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
                      <td>
                        <span className="badge">{expense.category}</span>
                      </td>
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

      case 'income':
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
                      <td>
                        <span className="badge">{income.category}</span>
                      </td>
                      <td>{new Date(income.date).toLocaleDateString()}</td>
                      <td className="income-amount">+${income.amount.toFixed(2)}</td>
                      <td>
                        <span className="status-badge received">
                          {income.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="content-section">
            <div className="page-header">
              <div>
                <h1 className="section-title">Expense Categories</h1>
                <p className="section-description">Organize your expenses with custom categories.</p>
              </div>
              <div className="action-buttons">
                <button className="btn-primary"><Plus size={18} /> Add Category</button>
              </div>
            </div>

            <div className="categories-grid">
              {categories.map(category => {
                const percentage = (category.spent / category.budget) * 100;
                return (
                  <div key={category.id} className="category-card">
                    <div className="category-card-header">
                      <div className="category-title">
                        <div className="category-dot-large" style={{ backgroundColor: category.color }}></div>
                        <h3>{category.name}</h3>
                      </div>
                      <Tag size={20} style={{ color: category.color }} />
                    </div>
                    <div className="category-stats">
                      <div className="category-stat">
                        <span className="stat-label">Budget</span>
                        <span className="stat-value">${category.budget}</span>
                      </div>
                      <div className="category-stat">
                        <span className="stat-label">Spent</span>
                        <span className="stat-value">${category.spent}</span>
                      </div>
                      <div className="category-stat">
                        <span className="stat-label">Transactions</span>
                        <span className="stat-value">{category.transactions}</span>
                      </div>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: category.color 
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="category-remaining">
                      ${(category.budget - category.spent).toFixed(2)} remaining
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="content-section">
            <div className="page-header">
              <div>
                <h1 className="section-title">User Management</h1>
                <p className="section-description">Manage users and permissions for your team.</p>
              </div>
              <div className="action-buttons">
                <button className="btn-primary"><Plus size={18} /> Invite User</button>
              </div>
            </div>

            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-avatar-large">{user.avatar}</div>
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                  <div className="user-info-grid">
                    <div className="user-info-item">
                      <span className="info-label">Role</span>
                      <span className={`badge badge-${user.role.toLowerCase()}`}>{user.role}</span>
                    </div>
                    <div className="user-info-item">
                      <span className="info-label">Status</span>
                      <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
                    </div>
                  </div>
                  <div className="user-actions">
                    <button className="btn-secondary">Edit</button>
                    <button className="btn-danger">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="content-section">
            <div className="page-header">
              <div>
                <h1 className="section-title">Financial Reports</h1>
                <p className="section-description">Generate comprehensive financial reports and insights.</p>
              </div>
              <div className="action-buttons">
                <button className="btn-secondary"><Calendar size={18} /> Date Range</button>
                <button className="btn-primary"><Download size={18} /> Export PDF</button>
              </div>
            </div>

            <div className="reports-grid">
              <div className="report-card">
                <FileText size={32} className="report-icon" />
                <h3>Monthly Report</h3>
                <p>Detailed monthly financial summary</p>
                <button className="btn-primary">Generate</button>
              </div>
              <div className="report-card">
                <PieChart size={32} className="report-icon" />
                <h3>Category Analysis</h3>
                <p>Spending breakdown by category</p>
                <button className="btn-primary">Generate</button>
              </div>
              <div className="report-card">
                <TrendingUp size={32} className="report-icon" />
                <h3>Income vs Expenses</h3>
                <p>Comparative financial analysis</p>
                <button className="btn-primary">Generate</button>
              </div>
              <div className="report-card">
                <Calendar size={32} className="report-icon" />
                <h3>Annual Report</h3>
                <p>Year-end financial summary</p>
                <button className="btn-primary">Generate</button>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="content-section">
            <h1 className="section-title">Analytics and Insights</h1>
            <p className="section-description">Visualize your financial data with charts and graphs.</p>
            <div className="coming-soon">
              <PieChart size={64} />
              <h2>Analytics Dashboard</h2>
              <p>Interactive charts and visualizations coming soon!</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="content-section">
            <h1 className="section-title">Settings</h1>
            <p className="section-description">Configure your expense tracker preferences.</p>
            
            <div className="settings-sections">
              <div className="settings-card">
                <h3 className="settings-title">Account Settings</h3>
                <div className="settings-item">
                  <div>
                    <p className="settings-label">Email Notifications</p>
                    <p className="settings-desc">Receive email updates for transactions</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-item">
                  <div>
                    <p className="settings-label">Two-Factor Authentication</p>
                    <p className="settings-desc">Add an extra layer of security</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-card">
                <h3 className="settings-title">Preferences</h3>
                <div className="settings-item">
                  <div>
                    <p className="settings-label">Currency</p>
                    <p className="settings-desc">Default currency for transactions</p>
                  </div>
                  <select className="settings-select">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>INR</option>
                  </select>
                </div>
                <div className="settings-item">
                  <div>
                    <p className="settings-label">Date Format</p>
                    <p className="settings-desc">How dates are displayed</p>
                  </div>
                  <select className="settings-select">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : ''}`}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #f5f7fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .dashboard-container.dark {
          background: #0f172a;
        }

        .sidebar {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          color: white;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          transition: width 0.3s ease;
          overflow: hidden;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .sidebar.open {
          width: 260px;
        }

        .sidebar.closed {
          width: 70px;
        }

        .sidebar-header {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          height: 70px;
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .sidebar.closed .logo {
          opacity: 0;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .menu {
          padding: 20px 0;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 14px 20px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
          white-space: nowrap;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .menu-item.active {
          background: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
          border-left-color: #3b82f6;
        }

        .menu-icon {
          min-width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-label {
          margin-left: 16px;
          font-size: 15px;
          font-weight: 500;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .sidebar.closed .menu-label {
          opacity: 0;
          width: 0;
        }

        .main-content {
          flex: 1;
          transition: margin-left 0.3s ease;
          min-height: 100vh;
        }

        .main-content.sidebar-open {
          margin-left: 260px;
        }

        .main-content.sidebar-closed {
          margin-left: 70px;
        }

        .top-bar {
          background: white;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .dark .top-bar {
          background: #1e293b;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .search-bar {
          flex: 1;
          max-width: 500px;
          margin: 0 20px;
          position: relative;
        }

        .search-bar input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          background: white;
        }

        .dark .search-bar input {
          background: #0f172a;
          border-color: #334155;
          color: white;
        }

        .search-bar input:focus {
          border-color: #3b82f6;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }

        .top-bar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          position: relative;
        }

        .dark .icon-btn {
          color: #94a3b8;
        }

        .icon-btn:hover {
          background: #f1f5f9;
        }

        .dark .icon-btn:hover {
          background: #334155;
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #ef4444;
          color: white;
          border-radius: 10px;
          padding: 2px 6px;
          font-size: 10px;
          font-weight: 600;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: 16px;
          padding-left: 16px;
          border-left: 1px solid #e2e8f0;
        }

        .dark .user-info {
          border-left-color: #334155;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
        }

        .content-area {
          padding: 30px;
        }

        .content-section {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .dark .section-title {
          color: #f1f5f9;
        }

        .section-subtitle {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 16px;
        }

        .dark .section-subtitle {
          color: #f1f5f9;
        }

        .section-description {
          color: #64748b;
          font-size: 16px;
          margin-bottom: 24px;
        }

        .dark .section-description {
          color: #94a3b8;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s ease;
        }

        .dark .stat-card {
          background: #1e293b;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-icon.expense {
          background: linear-gradient(135deg, #f43f5e 0%, #dc2626 100%);
        }

        .stat-icon.income {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .stat-icon.balance {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .stat-icon.transactions-icon {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }

        .stat-info {
          flex: 1;
        }

        .stat-label {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .dark .stat-label {
          color: #94a3b8;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .dark .stat-value {
          color: #f1f5f9;
        }

        .stat-change {
          font-size: 13px;
          color: #64748b;
        }

        .stat-change.positive {
          color: #10b981;
        }

        .stat-change.negative {
          color: #f43f5e;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        .recent-section, .budget-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .dark .recent-section, .dark .budget-section {
          background: #1e293b;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .btn-text {
          background: none;
          border: none;
          color: #3b82f6;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
        }

        .dark .transaction-item {
          background: #0f172a;
        }

        .transaction-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .transaction-icon.expense {
          background: linear-gradient(135deg, #f43f5e 0%, #dc2626 100%);
        }

        .transaction-icon.income {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .transaction-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .transaction-name {
          font-weight: 600;
          color: #1e293b;
          font-size: 15px;
        }

        .dark .transaction-name {
          color: #f1f5f9;
        }

        .transaction-date {
          font-size: 13px;
          color: #64748b;
        }

        .transaction-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .transaction-amount {
          font-weight: 700;
          font-size: 16px;
        }

        .expense-amount {
          color: #f43f5e;
        }

        .income-amount {
          color: #10b981;
        }

        .transaction-category {
          font-size: 12px;
          color: #64748b;
        }

        .budget-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .budget-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .budget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .budget-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .budget-name {
          font-weight: 600;
          color: #1e293b;
          font-size: 14px;
        }

        .dark .budget-name {
          color: #f1f5f9;
        }

        .budget-amount {
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .dark .progress-bar {
          background: #334155;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-secondary {
          background: white;
          color: #3b82f6;
          border: 2px solid #3b82f6;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dark .btn-secondary {
          background: #1e293b;
        }

        .btn-danger {
          background: white;
          color: #ef4444;
          border: 2px solid #ef4444;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .dark .btn-danger {
          background: #1e293b;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .dark .table-container {
          background: #1e293b;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table thead {
          background: #f8fafc;
        }

        .dark .data-table thead {
          background: #0f172a;
        }

        .data-table th {
          text-align: left;
          padding: 16px 20px;
          font-weight: 600;
          color: #64748b;
          font-size: 14px;
        }

        .data-table td {
          padding: 16px 20px;
          border-top: 1px solid #e2e8f0;
          color: #475569;
        }

        .dark .data-table td {
          border-top-color: #334155;
          color: #cbd5e1;
        }

        .font-medium {
          font-weight: 600;
          color: #1e293b;
        }

        .dark .font-medium {
          color: #f1f5f9;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          background: #e0e7ff;
          color: #3730a3;
        }

        .badge-recurring {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          background: #dbeafe;
          color: #1e40af;
        }

        .badge-onetime {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          background: #f3f4f6;
          color: #6b7280;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .status-badge.paid, .status-badge.received, .status-badge.active {
          background: #d1fae5;
          color: #065f46;
        }

        .status-badge.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-badge.inactive {
          background: #fee2e2;
          color: #991b1b;
        }

        .income-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .summary-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .dark .summary-card {
          background: #1e293b;
        }

        .summary-label {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 8px;
          display: block;
        }

        .summary-value {
          font-size: 32px;
          font-weight: 700;
          color: #1e293b;
        }

        .dark .summary-value {
          color: #f1f5f9;
        }

        .income-color {
          color: #10b981;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .category-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .dark .category-card {
          background: #1e293b;
        }

        .category-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .category-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .category-title h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .dark .category-title h3 {
          color: #f1f5f9;
        }

        .category-dot-large {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }

        .category-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .category-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .progress-bar-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .progress-bar-container .progress-bar {
          flex: 1;
        }

        .progress-text {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
        }

        .category-remaining {
          font-size: 13px;
          color: #10b981;
          font-weight: 600;
        }

        .users-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .user-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .dark .user-card {
          background: #1e293b;
        }

        .user-avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 28px;
          margin-bottom: 16px;
        }

        .user-name {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .dark .user-name {
          color: #f1f5f9;
        }

        .user-email {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 16px;
        }

        .user-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          margin-bottom: 16px;
        }

        .user-info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-label {
          font-size: 12px;
          color: #64748b;
        }

        .badge-admin {
          background: #dbeafe;
          color: #1e40af;
        }

        .badge-user {
          background: #e0e7ff;
          color: #3730a3;
        }

        .badge-manager {
          background: #ddd6fe;
          color: #5b21b6;
        }

        .user-actions {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .user-actions .btn-secondary,
        .user-actions .btn-danger {
          flex: 1;
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .report-card {
          background: white;
          padding: 32px 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
        }

        .dark .report-card {
          background: #1e293b;
        }

        .report-icon {
          color: #3b82f6;
        }

        .report-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .dark .report-card h3 {
          color: #f1f5f9;
        }

        .report-card p {
          color: #64748b;
          font-size: 14px;
        }

        .coming-soon {
          background: white;
          padding: 80px 40px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          min-height: 400px;
        }

        .dark .coming-soon {
          background: #1e293b;
        }

        .coming-soon h2 {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
        }

        .dark .coming-soon h2 {
          color: #f1f5f9;
        }

        .coming-soon p {
          color: #64748b;
        }

        .settings-sections {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .settings-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .dark .settings-card {
          background: #1e293b;
        }

        .settings-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 20px;
        }

        .dark .settings-title {
          color: #f1f5f9;
        }

        .settings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .dark .settings-item {
          border-bottom-color: #334155;
        }

        .settings-item:last-child {
          border-bottom: none;
        }

        .settings-label {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .dark .settings-label {
          color: #f1f5f9;
        }

        .settings-desc {
          font-size: 14px;
          color: #64748b;
        }

        .settings-select {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          color: #1e293b;
          background: white;
          cursor: pointer;
        }

        .dark .settings-select {
          background: #0f172a;
          border-color: #334155;
          color: #f1f5f9;
        }

        .toggle {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e1;
          transition: 0.3s;
          border-radius: 26px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #3b82f6;
        }

        input:checked + .slider:before {
          transform: translateX(24px);
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 70px !important;
          }

          .sidebar .logo,
          .sidebar .menu-label {
            display: none;
          }

          .main-content {
            margin-left: 70px !important;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .search-bar {
            display: none;
          }
        }
      `}</style>

      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">ExpenseTracker</div>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`menu-item ${activeView === item.id ? 'active' : ''}`}
                onClick={() => handleNavigation(item.id)}
              >
                <div className="menu-icon">
                  <Icon size={20} />
                </div>
                <span className="menu-label">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="top-bar">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search transactions, categories..." />
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="icon-btn">
              <Bell size={20} />
              {notifications > 0 && <span className="notification-badge">{notifications}</span>}
            </button>
            <div className="user-info">
              <div className="user-avatar">JD</div>
            </div>
          </div>
        </div>
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;