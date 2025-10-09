import React from "react";

const Settings = () => (
  <div className="content-section">
    <h1 className="section-title">Settings</h1>
    <p className="section-description">Configure your expense tracker preferences.</p>

    <div className="settings-sections">
      <div className="settings-card">
        <h3>Account Settings</h3>
        <div className="settings-item">
          <div>
            <p>Email Notifications</p>
            <p>Receive updates for transactions</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settings-item">
          <div>
            <p>Two-Factor Authentication</p>
            <p>Add extra security layer</p>
          </div>
          <label className="toggle">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-card">
        <h3>Preferences</h3>
        <div className="settings-item">
          <p>Currency</p>
          <select>
            <option>USD</option>
            <option>EUR</option>
            <option>INR</option>
          </select>
        </div>
        <div className="settings-item">
          <p>Date Format</p>
          <select>
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
