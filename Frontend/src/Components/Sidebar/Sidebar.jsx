// ============================================
// FILE: Updated Sidebar.jsx (Add New Menu Items)
// ============================================

import React from 'react';
import { X, Menu, Home,IndianRupee,TrendingUp, PieChart, Settings, CreditCard, FileText, Users, List, ArrowRightLeft } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: List },
    { id: 'lendrepay', label: 'Lend & Repay', icon: ArrowRightLeft },
    { id: 'expenses', label: 'Expenses', icon: IndianRupee },
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
        <button 
          className="toggle-btn" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Sidebar"
        >
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
              role="button"
              tabIndex={0}
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

export default Sidebar;