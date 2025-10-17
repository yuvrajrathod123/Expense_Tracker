// ============================================
// FILE: views/UsersView/UsersView.jsx
// ============================================
import React from 'react';
import { Plus } from 'lucide-react';
import './UsersView.css';

const UsersView = ({ users }) => {
  return (
    <div className="content-section">
      <div className="page-header">
        <div>
          <h1 className="section-title">User Management</h1>
          <p className="section-description">Manage users and permissions for your team.</p>
        </div>
        <div className="action-buttons">
          <button className="btn-primary"><Plus size={18} /> Invite User</button>
        </div>
      </div>

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-avatar-large">{user.avatar}</div>
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <div className="user-info-grid">
              <div className="user-info-item">
                <span className="info-label">Role</span>
                <span className={`badge badge-${user.role.toLowerCase()}`}>{user.role}</span>
              </div>
              <div className="user-info-item">
                <span className="info-label">Status</span>
                <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
              </div>
            </div>
            <div className="user-actions">
              <button className="btn-secondary">Edit</button>
              <button className="btn-danger">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersView;