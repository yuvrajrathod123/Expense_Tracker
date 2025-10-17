// ============================================
// FILE: views/AnalyticsView/AnalyticsView.jsx
// ============================================
import React from 'react';
import { PieChart } from 'lucide-react';
import './AnalyticsView.css';

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

export default AnalyticsView;