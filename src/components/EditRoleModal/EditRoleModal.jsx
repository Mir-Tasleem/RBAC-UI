import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { permissions } from '../../data';
import { Trash2 } from 'lucide-react';

export function EditRoleModal({ role, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    name: role.name,
    description: role.description,
    permissions: role.permissions
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...role,
      ...formData
    });
    onClose();
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      onDelete(role.id);
      onClose();
    }
  };

  return (
    <Modal title="Edit Role" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Role Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-input"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Permissions</label>
            <div className="checkbox-group">
              {permissions.map(permission => (
                <label key={permission.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.id)}
                    onChange={() => handlePermissionToggle(permission.id)}
                  />
                  {permission.name}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="button button-danger"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            Delete Role
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