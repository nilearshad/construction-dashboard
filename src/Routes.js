import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Category = React.lazy(() => import('./views/Category/Category'));
const Template = React.lazy(() => import('./views/Template/Template'));
const ChangePassword = React.lazy(() => import('./views/ChangePassword/ChangePassword'));

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
