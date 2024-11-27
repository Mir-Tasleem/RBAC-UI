import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { roles } from '../../data';

export function EditUserModal({ user, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: roles.find(r => r.name.toLowerCase() === user.role)?.id || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedRole = roles.find(role => role.id === formData.role);
    onSave({
      ...user,
      ...formData,
      role: selectedRole.name.toLowerCase()
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      onDelete(user.id);
      onClose();
    }
  };

  return (
    <Modal title="Edit User" onClose={onClose}>
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
          <button 
            type="button" 
            className="button button-danger"
            onClick={handleDelete}
          >
            Delete User
          </button>
          <div className="modal-footer-right">
            <button type="button" className="button" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">Save Changes</button>
          </div>
        </div>
      </form>
    </Modal>
  );
}