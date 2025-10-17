// ============================================
// FILE: components/StatCard/ColorStatCard.jsx
// ============================================
import React from 'react';
import './ColorStatCard.css';
import { Plus, Download, Search, Calendar, TrendingUp, TrendingDown, ArrowRightLeft, Wallet, CreditCard, Smartphone, Building2, X } from 'lucide-react';

const StatCard = ({icon: Icon, type, Balance }) => {
  return (
    <div className={`mode-balance-card ${type}-card`}>
        <div className="mode-icon">
            <Icon size={24} />
        </div>
        <div className="mode-details">
            <span className="mode-label">{`${type} Balance`}</span>
            <h3 className="mode-amount">₹{Balance}</h3>
        </div>
    </div>
  );
};

export default StatCard;