import React from "react";
import { Calendar, Download, FileText, TrendingUp, PieChart } from "lucide-react";

const Reports = () => (
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
        <FileText size={32} />
        <h3>Monthly Report</h3>
        <p>Detailed monthly summary</p>
        <button className="btn-primary">Generate</button>
      </div>
      <div className="report-card">
        <PieChart size={32} />
        <h3>Category Analysis</h3>
        <p>Spending breakdown by category</p>
        <button className="btn-primary">Generate</button>
      </div>
      <div className="report-card">
        <TrendingUp size={32} />
        <h3>Income vs Expenses</h3>
        <p>Comparative financial analysis</p>
        <button className="btn-primary">Generate</button>
      </div>
      <div className="report-card">
        <Calendar size={32} />
        <h3>Annual Report</h3>
        <p>Year-end summary</p>
        <button className="btn-primary">Generate</button>
      </div>
    </div>
  </div>
);

export default Reports;
