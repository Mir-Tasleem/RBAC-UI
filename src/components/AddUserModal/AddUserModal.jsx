import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { roles } from '../../data';

export function AddUserModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: roles[0]?.id || '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: Date.now().toString()
    });
    onClose();
  };

  return (
    <Modal title="Add New User" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-input"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              required
            >
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="button" onClick={onClose}>Cancel</button>
          <button type="submit" className="button button-primary">Save User</button>
        </div>
      </form>
    </Modal>
  );
}