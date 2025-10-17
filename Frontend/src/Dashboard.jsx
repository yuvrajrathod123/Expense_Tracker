// ============================================
// FILE: Dashboard.jsx (Updated with State Management)
// ============================================

import React, { useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar'
import TopBar from './Components/TopBar/TopBar';
import DashboardView from './views/DashboardView/DashboardView';
import ExpensesView from './views/ExpensesView/ExpensesView';
import IncomeView from './views/IncomeView/IncomeView';
import CategoriesView from './views/CategoriesView/CategoriesView';
import UsersView from './views/UsersView/UsersView';
import ReportsView from './views/ReportsView/ReportsView';
import AnalyticsView from './views/AnalyticsView/AnalyticsView';
import SettingsView from './views/SettingsView/SettingsView';
import TransactionsView from './views/TransactionsView/TransactionsView';
import LendRepayView from './views/LendRepayView/LendRepayView';
import { mockTransactions as initialTransactions, lendRepayMapping } from './Data/mockData';
import './Dashboard.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(5);
  
  // State for transactions (can be modified by user)
  const [mockTransactions, setMockTransactions] = useState(initialTransactions);

  // Original sample data
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

  // Handler for adding new transaction
  const handleAddTransaction = (newTransaction) => {
    setMockTransactions([newTransaction, ...mockTransactions]);
    console.log('New transaction added:', newTransaction);
  };

  // Handler for editing transaction
  const handleEditTransaction = (updatedTransaction) => {
    setMockTransactions(mockTransactions.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    ));
    console.log('Transaction updated:', updatedTransaction);
  };

  // Handler for deleting transaction
  const handleDeleteTransaction = (transactionId) => {
    setMockTransactions(mockTransactions.filter(t => t.id !== transactionId));
    console.log('Transaction deleted:', transactionId);
  };

  // Handler for exporting data
  const handleExportData = (data) => {
    console.log('Exporting data:', data);
  };

  // Render appropriate view based on activeView state
  const renderContent = () => {
    switch(activeView) {
      case 'dashboard':
        return <DashboardView transactions={transactions} categories={categories} />;
      case 'transactions':
        return (
          <TransactionsView 
            transactions={mockTransactions} 
            onAddTransaction={handleAddTransaction}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            onExportData={handleExportData}
          />
        );
      case 'lendrepay':
        return <LendRepayView lendRepayMapping={lendRepayMapping} />;
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