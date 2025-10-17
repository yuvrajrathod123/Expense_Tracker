// ============================================
// FILE: views/TransactionsView/TransactionsView.jsx (Excel-Style Filtering)
// ============================================
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, Download, Search, Calendar, TrendingUp, TrendingDown, ArrowRightLeft, Wallet, CreditCard, Smartphone, Building2, X, Filter, ChevronDown, Edit2, Trash2 } from 'lucide-react';
import ColorStatCard from '../../Components/ColorStatCard/ColorStatCard';
import './TransactionsView.css';

const TransactionsView = ({ transactions, onAddTransaction, onExportData, onDeleteTransaction, onEditTransaction }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const [columnFilters, setColumnFilters] = useState({
    date: { search: '', selected: [] },
    type: { search: '', selected: [] },
    description: { search: '', selected: [] },
    category: { search: '', selected: [] },
    mode: { search: '', selected: [] },
    amount: { search: '', selected: [] }
  });
  const [newTransaction, setNewTransaction] = useState({
    type: 'Expense',
    mode: 'UPI',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: ''
  });

  const filterDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setActiveFilterColumn(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'Income':
        return <TrendingUp size={18} />;
      case 'Expense':
        return <TrendingDown size={18} />;
      case 'Lend':
        return <ArrowRightLeft size={18} />;
      case 'Repay':
        return <Wallet size={18} />;
      default:
        return <TrendingDown size={18} />;
    }
  };

  const getTransactionColor = (type) => {
    switch(type) {
      case 'Income':
        return 'income';
      case 'Expense':
        return 'expense';
      case 'Lend':
        return 'lend';
      case 'Repay':
        return 'repay';
      default:
        return 'expense';
    }
  };

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'UPI':
        return <Smartphone size={20} />;
      case 'Card':
        return <CreditCard size={20} />;
      case 'Bank Transfer':
        return <Building2 size={20} />;
      case 'Wallet':
        return <Wallet size={20} />;
      case 'Cash':
        return <Wallet size={20} />;
      default:
        return <Wallet size={20} />;
    }
  };

  // Get unique values for each column
  const getUniqueValues = (column) => {
    const values = transactions.map(t => {
      switch(column) {
        case 'date':
          return new Date(t.date).toLocaleDateString('en-IN');
        case 'type':
          return t.type;
        case 'description':
          return t.description;
        case 'category':
          return t.category;
        case 'mode':
          return t.mode;
        case 'amount':
          return t.amount;
        default:
          return '';
      }
    });
    return [...new Set(values)].sort();
  };

  // Filter transactions based on column filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      return Object.keys(columnFilters).every(column => {
        const filter = columnFilters[column];
        if (filter.selected.length === 0 && !filter.search) return true;

        let value;
        switch(column) {
          case 'date':
            value = new Date(transaction.date).toLocaleDateString('en-IN');
            break;
          case 'type':
            value = transaction.type;
            break;
          case 'description':
            value = transaction.description;
            break;
          case 'category':
            value = transaction.category;
            break;
          case 'mode':
            value = transaction.mode;
            break;
          case 'amount':
            value = transaction.amount.toString();
            break;
          default:
            value = '';
        }

        const matchesSelected = filter.selected.length === 0 || filter.selected.includes(value);
        const matchesSearch = !filter.search || value.toLowerCase().includes(filter.search.toLowerCase());
        
        return matchesSelected && matchesSearch;
      });
    });
  }, [transactions, columnFilters]);

  // Calculate summary
  const summary = {
    totalIncome: transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0),
    totalExpense: transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0),
    totalLent: transactions.filter(t => t.type === 'Lend').reduce((sum, t) => sum + t.amount, 0),
    totalRepaid: transactions.filter(t => t.type === 'Repay').reduce((sum, t) => sum + t.amount, 0),
  };

  // Calculate balance by payment mode
  const calculateModeBalance = (mode) => {
    return transactions
      .filter(t => t.mode === mode)
      .reduce((balance, t) => {
        if (t.type === 'Income' || t.type === 'Repay') {
          return balance + t.amount;
        } else {
          return balance - t.amount;
        }
      }, 0);
  };

  const modeBalances = {
    upi: calculateModeBalance('UPI'),
    card: calculateModeBalance('Card'),
    wallet: calculateModeBalance('Wallet'),
    bank: calculateModeBalance('Bank Transfer'),
    cash: calculateModeBalance('Cash')
  };

  // Handle column filter toggle
  const toggleColumnFilter = (column) => {
    setActiveFilterColumn(activeFilterColumn === column ? null : column);
  };

  // Handle filter selection
  const handleFilterSelection = (column, value) => {
    setColumnFilters(prev => {
      const current = prev[column].selected;
      const newSelected = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      
      return {
        ...prev,
        [column]: { ...prev[column], selected: newSelected }
      };
    });
  };

  // Handle select all/none
  const handleSelectAll = (column) => {
    const allValues = getUniqueValues(column);
    setColumnFilters(prev => ({
      ...prev,
      [column]: { ...prev[column], selected: allValues }
    }));
  };

  const handleSelectNone = (column) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: { ...prev[column], selected: [] }
    }));
  };

  // Handle search within filter
  const handleFilterSearch = (column, searchValue) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: { ...prev[column], search: searchValue }
    }));
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setColumnFilters({
      date: { search: '', selected: [] },
      type: { search: '', selected: [] },
      description: { search: '', selected: [] },
      category: { search: '', selected: [] },
      mode: { search: '', selected: [] },
      amount: { search: '', selected: [] }
    });
  };

  // Check if any filter is active
  const hasActiveFilters = Object.values(columnFilters).some(
    filter => filter.selected.length > 0 || filter.search
  );

  // Handle Export
  const handleExport = () => {
    const csvContent = [
      ['Date', 'Type', 'Description', 'Category', 'Mode', 'Amount'],
      ...filteredTransactions.map(t => [
        t.date,
        t.type,
        t.description,
        t.category,
        t.mode,
        t.amount
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    if (onExportData) {
      onExportData(filteredTransactions);
    }
  };

  // Handle Add Transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    };

    if (onAddTransaction) {
      onAddTransaction(transaction);
    }

    setNewTransaction({
      type: 'Expense',
      mode: 'UPI',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: ''
    });
    setShowAddModal(false);
  };

  // Handle Edit Transaction
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setNewTransaction({
      type: transaction.type,
      mode: transaction.mode,
      amount: transaction.amount.toString(),
      date: transaction.date,
      description: transaction.description,
      category: transaction.category
    });
    setShowEditModal(true);
  };

  const handleUpdateTransaction = (e) => {
    e.preventDefault();
    
    const updatedTransaction = {
      ...editingTransaction,
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    };

    if (onEditTransaction) {
      onEditTransaction(updatedTransaction);
    }

    setNewTransaction({
      type: 'Expense',
      mode: 'UPI',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: ''
    });
    setShowEditModal(false);
    setEditingTransaction(null);
  };

  // Handle Delete Transaction
  const handleDeleteClick = (transaction) => {
    if (window.confirm(`Are you sure you want to delete this transaction: ${transaction.description}?`)) {
      if (onDeleteTransaction) {
        onDeleteTransaction(transaction.id);
      }
    }
  };

  // Render column filter dropdown
  const renderFilterDropdown = (column, columnName) => {
    if (activeFilterColumn !== column) return null;

    const uniqueValues = getUniqueValues(column);
    const filter = columnFilters[column];
    const filteredValues = uniqueValues.filter(value =>
      value.toString().toLowerCase().includes(filter.search.toLowerCase())
    );

    return (
      <div className="column-filter-dropdown" ref={filterDropdownRef}>
        <div className="filter-dropdown-header">
          <span className="filter-dropdown-title">Filter {columnName}</span>
          <button className="filter-close" onClick={() => setActiveFilterColumn(null)}>
            <X size={16} />
          </button>
        </div>

        <div className="filter-search-box">
          <Search size={14} />
          <input
            type="text"
            placeholder={`Search ${columnName.toLowerCase()}...`}
            value={filter.search}
            onChange={(e) => handleFilterSearch(column, e.target.value)}
          />
        </div>

        <div className="filter-actions-row">
          <button className="filter-action-btn" onClick={() => handleSelectAll(column)}>
            Select All
          </button>
          <button className="filter-action-btn" onClick={() => handleSelectNone(column)}>
            Clear
          </button>
        </div>

        <div className="filter-options-list">
          {filteredValues.length > 0 ? (
            filteredValues.map((value, index) => (
              <label key={index} className="filter-option">
                <input
                  type="checkbox"
                  checked={filter.selected.includes(value)}
                  onChange={() => handleFilterSelection(column, value)}
                />
                <span>{value}</span>
              </label>
            ))
          ) : (
            <div className="no-filter-results">No matching values</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="content-section">
      <div className="page-header">
        <div>
          <h1 className="section-title">All Transactions</h1>
          <p className="section-description">Complete transaction history with Excel-style column filtering.</p>
        </div>
        <div className="action-buttons">
          {hasActiveFilters && (
            <button className="btn-secondary" onClick={handleClearAllFilters}>
              <X size={18} /> Clear Filters
            </button>
          )}
          <button className="btn-secondary" onClick={handleExport}>
            <Download size={18} /> Export
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> Add Transaction
          </button>
        </div>
      </div>

      {/* Payment Mode Balances */}
      <div className="mode-balances">
        <ColorStatCard icon={Smartphone} type={"upi"} Balance={modeBalances.upi.toLocaleString()}/>
        {/* <ColorStatCard icon={CreditCard} type={"card"} Balance={modeBalances.card.toLocaleString()}/> */}
        {/* <ColorStatCard icon={Wallet} type={"wallet"} Balance={modeBalances.wallet.toLocaleString()}/> */}
        <ColorStatCard icon={Building2} type={"bank"} Balance={modeBalances.bank.toLocaleString()}/>
        <ColorStatCard icon={Wallet} type={"cash"} Balance={modeBalances.cash.toLocaleString()}/>
      </div>

      {/* Summary Cards */}
      <div className="transaction-summary">
        <div className="summary-card summary-income">
          <div className="summary-icon">
            <TrendingUp size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-label">Total Income</span>
            <h3 className="summary-amount">₹{summary.totalIncome.toLocaleString()}</h3>
          </div>
        </div>
        <div className="summary-card summary-expense">
          <div className="summary-icon">
            <TrendingDown size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-label">Total Expense</span>
            <h3 className="summary-amount">₹{summary.totalExpense.toLocaleString()}</h3>
          </div>
        </div>
        <div className="summary-card summary-lend">
          <div className="summary-icon">
            <ArrowRightLeft size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-label">Total Lent</span>
            <h3 className="summary-amount">₹{summary.totalLent.toLocaleString()}</h3>
          </div>
        </div>
        <div className="summary-card summary-repay">
          <div className="summary-icon">
            <Wallet size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-label">Total Repaid</span>
            <h3 className="summary-amount">₹{summary.totalRepaid.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Results Info */}
      {hasActiveFilters && (
        <div className="filter-info-bar">
          <span>Showing {filteredTransactions.length} of {transactions.length} transactions</span>
          <button className="btn-text" onClick={handleClearAllFilters}>
            Clear all filters
          </button>
        </div>
      )}

      {/* Transactions Table with Column Filters */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="filterable-column">
                <div className="column-header">
                  <span>Date</span>
                  <button 
                    className={`filter-toggle ${columnFilters.date.selected.length > 0 || columnFilters.date.search ? 'active' : ''}`}
                    onClick={() => toggleColumnFilter('date')}
                  >
                    <Filter size={14} />
                  </button>
                </div>
                {renderFilterDropdown('date', 'Date')}
              </th>
              <th className="filterable-column">
                <div className="column-header">
                  <span>Type</span>
                  <button 
                    className={`filter-toggle ${columnFilters.type.selected.length > 0 || columnFilters.type.search ? 'active' : ''}`}
                    onClick={() => toggleColumnFilter('type')}
                  >
                    <Filter size={14} />
                  </button>
                </div>
                {renderFilterDropdown('type', 'Type')}
              </th>
              <th className="filterable-column">
                <div className="column-header">
                  <span>Description</span>
                  <button 
                    className={`filter-toggle ${columnFilters.description.selected.length > 0 || columnFilters.description.search ? 'active' : ''}`}
                    onClick={() => toggleColumnFilter('description')}
                  >
                    <Filter size={14} />
                  </button>
                </div>
                {renderFilterDropdown('description', 'Description')}
              </th>
              <th className="filterable-column">
                <div className="column-header">
                  <span>Category</span>
                  <button 
                    className={`filter-toggle ${columnFilters.category.selected.length > 0 || columnFilters.category.search ? 'active' : ''}`}
                    onClick={() => toggleColumnFilter('category')}
                  >
                    <Filter size={14} />
                  </button>
                </div>
                {renderFilterDropdown('category', 'Category')}
              </th>
              <th className="filterable-column">
                <div className="column-header">
                  <span>Mode</span>
                  <button 
                    className={`filter-toggle ${columnFilters.mode.selected.length > 0 || columnFilters.mode.search ? 'active' : ''}`}
                    onClick={() => toggleColumnFilter('mode')}
                  >
                    <Filter size={14} />
                  </button>
                </div>
                {renderFilterDropdown('mode', 'Mode')}
              </th>
              <th className="filterable-column">
                <div className="column-header">
                  <span>Amount</span>
                  <button 
                    className={`filter-toggle ${columnFilters.amount.selected.length > 0 || columnFilters.amount.search ? 'active' : ''}`}
                    onClick={() => toggleColumnFilter('amount')}
                  >
                    <Filter size={14} />
                  </button>
                </div>
                {renderFilterDropdown('amount', 'Amount')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="font-medium">
                  <div className="date-cell">
                    <Calendar size={14} />
                    {new Date(transaction.date).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </div>
                </td>
                <td>
                  <span className={`transaction-type-badge ${getTransactionColor(transaction.type)}`}>
                    {getTransactionIcon(transaction.type)}
                    {transaction.type}
                  </span>
                </td>
                <td className="font-medium">{transaction.description}</td>
                <td>
                  <span className="category-badge">{transaction.category}</span>
                </td>
                <td className="mode-cell">
                  <div className="mode-display">
                    {getModeIcon(transaction.mode)}
                    {transaction.mode}
                  </div>
                </td>
                <td>
                  <span className={`amount-cell ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'Income' || transaction.type === 'Repay' ? '+' : '-'}
                    ₹{transaction.amount.toLocaleString()}
                  </span>
                </td>
                <td>
                  <div className="action-buttons-cell">
                    <button 
                      className="action-btn edit-btn" 
                      onClick={() => handleEditClick(transaction)}
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      onClick={() => handleDeleteClick(transaction)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <div className="no-results">
            <Search size={48} />
            <h3>No transactions found</h3>
            <p>Try adjusting your filters.</p>
            <button className="btn-primary" onClick={handleClearAllFilters}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Transaction Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay" onClick={() => {
          setShowAddModal(false);
          setShowEditModal(false);
          setEditingTransaction(null);
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{showEditModal ? 'Edit Transaction' : 'Add New Transaction'}</h2>
              <button className="modal-close" onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setEditingTransaction(null);
              }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={showEditModal ? handleUpdateTransaction : handleAddTransaction} className="transaction-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                    required
                  >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="Lend">Lend</option>
                    <option value="Repay">Repay</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Mode</label>
                  <select
                    value={newTransaction.mode}
                    onChange={(e) => setNewTransaction({...newTransaction, mode: e.target.value})}
                    required
                  >
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  placeholder="Enter description"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  placeholder="Enter category"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setEditingTransaction(null);
                }}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {showEditModal ? 'Update Transaction' : 'Add Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsView;