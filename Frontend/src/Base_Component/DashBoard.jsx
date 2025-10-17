import React, { useState } from 'react';
import { Menu, X, Home, DollarSign, TrendingUp, PieChart, Settings, CreditCard, FileText, Users, Moon, Sun, Bell, Download, Filter, Plus, Search, Calendar, Tag, TrendingDown } from 'lucide-react';
import './DashBoard.css';

// Sidebar Component
const Sidebar = ({ sidebarOpen, setSidebarOpen, activeView, setActiveView }) => {
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

  return (
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
              onClick={() => setActiveView(item.id)}
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
  );
};

// TopBar Component
const TopBar = ({ darkMode, setDarkMode, notifications }) => {
  return (
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
  );
};

// StatCard Component
const StatCard = ({ icon: Icon, label, value, change, type }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>
        <Icon size={24} />
      </div>
      <div className="stat-info">
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
        <span className={`stat-change ${change.includes('+') ? (change.includes('expense') ? 'negative' : 'positive') : ''}`}>
          {change}
        </span>
      </div>
    </div>
  );
};

// TransactionItem Component
const TransactionItem = ({ transaction }) => {
  return (
    <div className="transaction-item">
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
  );
};

// BudgetItem Component
const BudgetItem = ({ category }) => {
  return (
    <div className="budget-item">
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
  );
};

// Dashboard View Component
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
              <BudgetItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Expenses View Component
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

// Income View Component
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

// Categories View Component
const CategoriesView = ({ categories }) => {
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
};

// Users View Component
const UsersView = ({ users }) => {
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
};

// Reports View Component
const ReportsView = () => {
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
};

// Analytics View Component
const AnalyticsView = () => {
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
};

// Settings View Component
const SettingsView = () => {
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
};

// Main Dashboard Component
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(5);

  // Sample data
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

  const renderContent = () => {
    switch(activeView) {
      case 'dashboard':
        return <DashboardView transactions={transactions} categories={categories} />;
      case 'expenses':
        return <ExpensesView expenses={expenses} />;
      case 'income':
        return <IncomeView incomes={incomes} />;
      case 'categories':
        return <CategoriesView categories={categories} />;
      case 'users':
        return <UsersView users={users} />;
      case 'reports':
        return <ReportsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView transactions={transactions} categories={categories} />;
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : ''}`}>
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <TopBar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          notifications={notifications} 
        />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;