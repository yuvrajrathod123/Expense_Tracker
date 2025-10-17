// ============================================
// FILE: views/SettingsView/SettingsView.jsx
// ============================================
import React from 'react';
import './SettingsView.css';

const SettingsView = () => {
  return (
    <div className="content-section">
      <h1 className="section-title">Settings</h1>
      <p className="section-description">Configure your expense tracker preferences.</p>
      
      <div className="settings-sections">
        <div className="settings-card">
          <h3 className="settings-title">Account Settings</h3>
          <div className="settings-item">
            <div>
              <p className="settings-label">Email Notifications</p>
              <p className="settings-desc">Receive email updates for transactions</p>
            </div>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
          <div className="settings-item">
            <div>
              <p className="settings-label">Two-Factor Authentication</p>
              <p className="settings-desc">Add an extra layer of security</p>
            </div>
            <label className="toggle">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-card">
          <h3 className="settings-title">Preferences</h3>
          <div className="settings-item">
            <div>
              <p className="settings-label">Currency</p>
              <p className="settings-desc">Default currency for transactions</p>
            </div>
            <select className="settings-select">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
            </select>
          </div>
          <div className="settings-item">
            <div>
              <p className="settings-label">Date Format</p>
              <p className="settings-desc">How dates are displayed</p>
            </div>
            <select className="settings-select">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;