import React, { useState } from 'react';
import { Users, ShieldCheck, Settings } from 'lucide-react';
import { RoleCard } from './components/RoleCard/RoleCard';
import { UserList } from './components/UserList/UserList';
import { AddRoleModal } from './components/AddRoleModal/AddRoleModal';
import { AddUserModal } from './components/AddUserModal/AddUserModal';
import { EditRoleModal } from './components/EditRoleModal/EditRoleModal';
import { roles as initialRoles, users as initialUsers } from './data';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('roles');
  const [roles, setRoles] = useState(initialRoles);
  const [users, setUsers] = useState(initialUsers);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const handleEditRole = (role) => {
    setEditingRole(role);
  };

  const handleUpdateRole = (updatedRole) => {
    setRoles(prev => prev.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
  };

  const handleDeleteRole = (roleId) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
    setUsers(prev => prev.filter(user => 
      user.role !== roles.find(r => r.id === roleId)?.name.toLowerCase()
    ));
  };

  const handleEditUser = (updatedUser) => {
    setUsers(prev => prev.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleAddRole = (newRole) => {
    setRoles(prev => [...prev, newRole]);
  };

  const handleAddUser = (newUser) => {
    const selectedRole = roles.find(role => role.id === newUser.role);
    setUsers(prev => [...prev, {
      ...newUser,
      role: selectedRole.name.toLowerCase()
    }]);
  };

  return (
    <div className="app">
      <nav className="nav">
        <div className="container nav-container">
          <div className="nav-brand">
            <ShieldCheck size={32} className="brand-icon" />
            <span>Access Control</span>
          </div>
          <button className="button button-icon">
            <Settings size={24} />
          </button>
        </div>
      </nav>

      <main className="container main">
        <select
          className="mobile-select"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          <option value="roles">Roles</option>
          <option value="users">Users</option>
        </select>

        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            <ShieldCheck size={20} />
            Roles & Permissions
          </button>
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            Users
          </button>
        </div>

        {activeTab === 'roles' ? (
          <>
            <div className="section-header">
              <h2 className="section-title">Roles</h2>
              <button 
                className="button button-primary"
                onClick={() => setShowAddRole(true)}
              >
                Add New Role
              </button>
            </div>
            <div className="roles-grid">
              {roles.map((role) => (
                <RoleCard key={role.id} role={role} onEdit={handleEditRole} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="section-header">
              <h2 className="section-title">Users</h2>
              <button 
                className="button button-primary"
                onClick={() => setShowAddUser(true)}
              >
                Add New User
              </button>
            </div>
            <UserList 
              users={users} 
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          </>
        )}

        {showAddRole && (
          <AddRoleModal
            onClose={() => setShowAddRole(false)}
            onSave={handleAddRole}
          />
        )}

        {showAddUser && (
          <AddUserModal
            onClose={() => setShowAddUser(false)}
            onSave={handleAddUser}
          />
        )}

        {editingRole && (
          <EditRoleModal
            role={editingRole}
            onClose={() => setEditingRole(null)}
            onSave={handleUpdateRole}
            onDelete={handleDeleteRole}
          />
        )}
      </main>
    </div>
  );
}