// ============================================
// FILE: components/TransactionItem/TransactionItem.jsx
// ============================================
import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import './TransactionItem.css';

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

export default TransactionItem;