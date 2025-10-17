import React, { useState } from 'react';
import { Plus, Users, Clock, CheckCircle, AlertCircle, TrendingUp, X } from 'lucide-react';
import './LendRepayView.css';

const LendRepayView = ({ lendRepayMapping }) => {
  const [data, setData] = useState(lendRepayMapping);
  const [activeTab, setActiveTab] = useState('All');

  // For modal states
  const [showRepayModal, setShowRepayModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [repayAmount, setRepayAmount] = useState('');

  // Filter based on active tab
  const filteredData = data.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return item.balance > 0;
    if (activeTab === 'Completed') return item.balance === 0;
    return true;
  });

  const totalLent = data.reduce((sum, item) => sum + item.lentAmount, 0);
  const totalRepaid = data.reduce((sum, item) => sum + item.repaidAmount, 0);
  const totalPending = data.reduce((sum, item) => sum + item.balance, 0);
  const pendingCount = data.filter(item => item.balance > 0).length;

  // Handle record repayment
  const handleRecordRepayment = (item) => {
    setSelectedItem(item);
    setRepayAmount('');
    setShowRepayModal(true);
  };

  const confirmRepayment = () => {
    if (!repayAmount || repayAmount <= 0) return alert('Enter valid amount');

    setData(prevData =>
      prevData.map(entry => {
        if (entry.lendId === selectedItem.lendId) {
          const newRepaid = entry.repaidAmount + parseFloat(repayAmount);
          const newBalance = Math.max(entry.lentAmount - newRepaid, 0);

          const updatedHistory = [
            ...(entry.history || []),
            { date: new Date().toISOString().split('T')[0], amount: parseFloat(repayAmount) },
          ];

          return {
            ...entry,
            repaidAmount: newRepaid,
            balance: newBalance,
            repaidDate: newBalance === 0 ? new Date().toISOString() : entry.repaidDate,
            history: updatedHistory,
          };
        }
        return entry;
      })
    );

    setShowRepayModal(false);
  };

  // Handle view history
  const handleViewHistory = (item) => {
    setSelectedItem(item);
    setShowHistoryModal(true);
  };

  return (
    <div className="content-section">
      <div className="page-header">
        <div>
          <h1 className="section-title">Lend & Repay Management</h1>
          <p className="section-description">Track money lent to others and repayments received.</p>
        </div>
        <div className="action-buttons">
          <button className="btn-primary"><Plus size={18} /> Add Lend Entry</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="lend-stats">
        <div className="stat-card-lend"><div className="stat-icon-lend lent"><TrendingUp size={28} /></div><div className="stat-content"><span className="stat-label-lend">Total Lent</span><h3 className="stat-value-lend">₹{totalLent.toLocaleString()}</h3></div></div>
        <div className="stat-card-lend"><div className="stat-icon-lend repaid"><CheckCircle size={28} /></div><div className="stat-content"><span className="stat-label-lend">Total Repaid</span><h3 className="stat-value-lend">₹{totalRepaid.toLocaleString()}</h3></div></div>
        <div className="stat-card-lend"><div className="stat-icon-lend pending"><Clock size={28} /></div><div className="stat-content"><span className="stat-label-lend">Pending Amount</span><h3 className="stat-value-lend">₹{totalPending.toLocaleString()}</h3></div></div>
        <div className="stat-card-lend"><div className="stat-icon-lend people"><Users size={28} /></div><div className="stat-content"><span className="stat-label-lend">Pending Entries</span><h3 className="stat-value-lend">{pendingCount}</h3></div></div>
      </div>

      {/* Filter Tabs */}
      <div className="lend-tabs">
        {['All', 'Pending', 'Completed'].map(tab => (
          <button key={tab} className={`lend-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
            {tab === 'Pending' && pendingCount > 0 && <span className="tab-badge">{pendingCount}</span>}
          </button>
        ))}
      </div>

      {/* Lend Cards */}
      <div className="lend-grid">
        {filteredData.map(item => (
          <div key={item.lendId} className="lend-card">
            <div className="lend-card-header">
              <div className="person-info">
                <div className="person-avatar">{item.person.charAt(0).toUpperCase()}</div>
                <div>
                  <h3 className="person-name">{item.person}</h3>
                  <span className="lend-id">ID: {item.lendId}</span>
                </div>
              </div>
              <div className={`status-indicator ${item.balance === 0 ? 'completed' : 'pending'}`}>
                {item.balance === 0 ? <CheckCircle size={20} /> : <Clock size={20} />}
              </div>
            </div>

            <div className="lend-amounts">
              <div className="amount-row"><span className="amount-label">Lent Amount</span><span className="amount-value lent">₹{item.lentAmount.toLocaleString()}</span></div>
              <div className="amount-row"><span className="amount-label">Repaid Amount</span><span className="amount-value repaid">₹{item.repaidAmount.toLocaleString()}</span></div>
              <div className="amount-row balance-row"><span className="amount-label">Balance</span><span className={`amount-value ${item.balance > 0 ? 'pending-balance' : 'completed-balance'}`}>₹{item.balance.toLocaleString()}</span></div>
            </div>

            <div className="lend-dates">
              <div className="date-info"><span className="date-label">Lent Date</span><span className="date-value">{new Date(item.lentDate).toLocaleDateString('en-IN')}</span></div>
              <div className="date-info"><span className="date-label">Repaid Date</span><span className="date-value">{item.repaidDate === '-' ? 'Pending' : new Date(item.repaidDate).toLocaleDateString('en-IN')}</span></div>
            </div>

            {item.balance > 0 && (
              <div className="lend-progress">
                <div className="progress-bar-lend">
                  <div className="progress-fill-lend" style={{ width: `${(item.repaidAmount / item.lentAmount) * 100}%` }}></div>
                </div>
                <span className="progress-text-lend">{((item.repaidAmount / item.lentAmount) * 100).toFixed(0)}% Repaid</span>
              </div>
            )}

            <div className="lend-actions">
              {item.balance > 0 && (
                <button className="btn-action repay-btn" onClick={() => handleRecordRepayment(item)}>
                  <CheckCircle size={16} /> Record Repayment
                </button>
              )}
              <button className="btn-action view-btn" onClick={() => handleViewHistory(item)}>View History</button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="no-lend-data">
          <AlertCircle size={48} />
          <h3>No {activeTab.toLowerCase()} lend entries found</h3>
          <p>Start by adding a new lend entry using the button above.</p>
        </div>
      )}

      {/* Record Repayment Modal */}
      {showRepayModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Record Repayment for {selectedItem.person}</h2>
              <button className="close-btn" onClick={() => setShowRepayModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <label>Enter Amount:</label>
              <input
                type="number"
                value={repayAmount}
                onChange={e => setRepayAmount(e.target.value)}
                placeholder="Enter repayment amount"
              />
              <button className="btn-primary" onClick={confirmRepayment}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* View History Modal */}
      {showHistoryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Repayment History - {selectedItem.person}</h2>
              <button className="close-btn" onClick={() => setShowHistoryModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {selectedItem.history && selectedItem.history.length > 0 ? (
                <ul className="history-list">
                  {selectedItem.history.map((entry, i) => (
                    <li key={i}>
                      <span>{new Date(entry.date).toLocaleDateString('en-IN')}</span>
                      <strong>₹{entry.amount.toLocaleString()}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No repayment history available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LendRepayView;
