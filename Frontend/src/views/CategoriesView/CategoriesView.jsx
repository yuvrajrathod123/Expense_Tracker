// ============================================
// FILE: views/CategoriesView/CategoriesView.jsx
// ============================================
import React from 'react';
import { Plus, Tag } from 'lucide-react';
import './CategoriesView.css';

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

export default CategoriesView;