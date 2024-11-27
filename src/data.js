export const users = [
    {
      id: '1',
      name: 'Sarah',
      email: 'sarah@example.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      id: '2',
      name: 'Michael',
      email: 'michael@example.com',
      role: 'editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    {
      id: '3',
      name: 'Ruvii',
      email: 'ruvii@example.com',
      role: 'viewer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
    // {
    //   id: '4',
    //   name: 'Qasim',
    //   email: 'rqasim@example.com',
    //   role: 'viewer',
    //   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    // },
    // {
    //   id: '5',
    //   name: 'Raj',
    //   email: 'raj.s@example.com',
    //   role: 'viewer',
    //   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    // },
  ];
  
  export const permissions = [
    {
      id: 'p1',
      name: 'users.create',
      description: 'Create new users',
      module: 'Users',
    },
    {
      id: 'p2',
      name: 'users.edit',
      description: 'Edit existing users',
      module: 'Users',
    },
    {
      id: 'p3',
      name: 'users.delete',
      description: 'Delete users',
      module: 'Users',
    },
    {
      id: 'p4',
      name: 'roles.manage',
      description: 'Manage roles and permissions',
      module: 'Roles',
    },
    {
      id: 'p5',
      name: 'content.create',
      description: 'Create content',
      module: 'Content',
    },
    {
      id: 'p6',
      name: 'content.publish',
      description: 'Publish content',
      module: 'Content',
    },
  ];
  
  export const roles = [
    {
      id: '1',
      name: 'Administrator',
      description: 'Full system access',
      permissions: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
      userCount: 2,
    },
    {
      id: '2',
      name: 'Editor',
      description: 'Content management access',
      permissions: ['p5', 'p6'],
      userCount: 5,
    },
    {
      id: '3',
      name: 'Viewer',
      description: 'Read-only access',
      permissions: [],
      userCount: 10,
    },
  ];