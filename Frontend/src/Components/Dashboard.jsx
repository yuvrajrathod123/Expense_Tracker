import React, { useState } from 'react';
import { 
  Menu, X, Home, DollarSign, TrendingUp, PieChart, CreditCard, FileText, 
  Users as UsersIcon, Settings as SettingsIcon, Moon, Sun, Bell, Search 
} from 'lucide-react';
import './Dashboard.css';

import DashboardOverview from "./Dashboard/DashboardOverview";
import Expenses from "./Dashboard/Expenses";
import Income from "./Dashboard/Income";
import Categories from "./Dashboard/Categories";
import Users from "./Dashboard/Users";
import Reports from "./Dashboard/Reports";
import Analytics from "./Dashboard/Analytics";
import Settings from "./Dashboard/Settings";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(5);

  // Dummy data
  const transactions = [
    { id: 1, name: "Groceries", date: "2025-09-15", type: "expense", amount: -45.3, category: "Food" },
    { id: 2, name: "Freelance", date: "2025-09-17", type: "income", amount: 120.0, category: "Work" },
  ];

  const categories = [
    { id: 1, name: "Food", spent: 200, budget: 400, color: "#FF5733", transactions: 5 },
    { id: 2, name: "Transport", spent: 150, budget: 200, color: "#36A2EB", transactions: 3 },
  ];

  const expenses = [
    { id: 1, name: "Rent", category: "Housing", date: "2025-09-10", amount: 500, status: "Paid", recurring: true },
    { id: 2, name: "Internet", category: "Utilities", date: "2025-09-12", amount: 60, status: "Pending", recurring: false },
  ];

  const incomes = [
    { id: 1, source: "Salary", category: "Job", date: "2025-09-01", amount: 1500, status: "Received" },
  ];

  const users = [
    { id: 1, name: "Yuvraj Rathod", email: "yuvraj@example.com", role: "Admin", status: "Active", avatar: "👨‍💻" },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
    { id: 'income', label: 'Income', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'categories', label: 'Categories', icon: CreditCard },
    { id: 'users', label: 'Users', icon: UsersIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  // Navigation handler
  const handleNavigation = (view) => {
    setActiveView(view);
  };

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "dashboard": return <DashboardOverview transactions={transactions} categories={categories} />;
      case "expenses": return <Expenses expenses={expenses} />;
      case "income": return <Income incomes={incomes} />;
      case "categories": return <Categories categories={categories} />;
      case "users": return <Users users={users} />;
      case "reports": return <Reports />;
      case "analytics": return <Analytics />;
      case "settings": return <Settings />;
      default: return <div>Select a menu item</div>;
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
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
                <div className="menu-icon"><Icon size={20} /></div>
                <span className="menu-label">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
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
