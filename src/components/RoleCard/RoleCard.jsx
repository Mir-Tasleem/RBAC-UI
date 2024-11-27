import React from 'react';
import { Users, Shield } from 'lucide-react';
import { permissions } from '../../data';
import './RoleCard.css';

export function RoleCard({ role, onEdit }) {
  const rolePermissions = permissions.filter(p => role.permissions.includes(p.id));
  
  return (
    <div className="role-card">
      <div className="role-header">
        <div className="role-info">
          <h3>{role.name}</h3>
          <p>{role.description}</p>
        </div>
        <button className="button" onClick={() => onEdit(role)}>
          Edit
        </button>
      </div>
      
      <div className="role-stats">
        <div className="stat">
          <Users size={16} />
          <span>{role.userCount} users</span>
        </div>
        <div className="stat">
          <Shield size={16} />
          <span>{rolePermissions.length} permissions</span>
        </div>
      </div>

      <div className="permissions">
        {rolePermissions.slice(0, 3).map((permission) => (
          <div key={permission.id} className="permission-tag">
            {permission.name}
          </div>
        ))}
        {rolePermissions.length > 3 && (
          <span className="more-count">
            +{rolePermissions.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}