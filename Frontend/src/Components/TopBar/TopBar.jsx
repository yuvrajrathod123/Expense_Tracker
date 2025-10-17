// ============================================
// FILE: components/TopBar/TopBar.jsx
// ============================================
import React from 'react';
import { Moon, Sun, Bell, Search } from 'lucide-react';
import './TopBar.css';

const TopBar = ({ darkMode, setDarkMode, notifications }) => {
  return (
    <div className="top-bar">
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="Search transactions, categories..." />
      </div>
      <div className="top-bar-actions">
        <button 
          className="icon-btn" 
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="icon-btn" aria-label="Notifications">
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

export default TopBar;