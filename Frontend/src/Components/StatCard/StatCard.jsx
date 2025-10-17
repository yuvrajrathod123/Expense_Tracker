// ============================================
// FILE: components/StatCard/StatCard.jsx
// ============================================
import React from 'react';
import './StatCard.css';

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

export default StatCard;