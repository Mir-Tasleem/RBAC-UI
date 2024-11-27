import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { EditUserModal } from '../EditUserModal/EditUserModal';
import './UserList.css';

export function UserList({ users, onEditUser, onDeleteUser }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const handleActionClick = (userId) => {
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setActiveDropdown(null);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      onDeleteUser(userId);
    }
    setActiveDropdown(null);
  };

  return (
    <div className="user-list">
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Email</th>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <img
                    className="avatar"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <span className="user-name">{user.name}</span>
                </div>
              </td>
              <td>
                <span className="role-badge">{user.role}</span>
              </td>
              <td className="email">{user.email}</td>
              <td>
                <div className="action-dropdown">
                  <button
                    className="action-button"
                    onClick={() => handleActionClick(user.id)}
                  >
                    <MoreVertical size={20} />
                  </button>
                  {activeDropdown === user.id && (
                    <div className="dropdown-menu">
                      <button 
                        className="dropdown-item"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button 
                        className="dropdown-item dropdown-item-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={onEditUser}
          onDelete={onDeleteUser}
        />
      )}
    </div>
  );
}