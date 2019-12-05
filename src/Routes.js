import React from 'react';
import Dashboard  from './views/Dashboard';
import Users  from './views/Users/Users';
import User  from './views/Users/User';
import Category  from './views/Category/Category';
import Template  from './views/Template/Template';
import ChangePassword  from './views/ChangePassword/ChangePassword';

const routes = [
  { path: '/admin/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },  
  { path: '/admin/users', exact: true,  name: 'Users', component: Users },  
  { path: '/admin/users/:profileId', exact: true, name: 'User Details', component: User },
  { path: '/admin/category', exact: true,  name: 'Category', component: Category },
  { path: '/admin/template', exact: true,  name: 'User Template', component: Template },
  { path: '/admin/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
];

export default routes;
