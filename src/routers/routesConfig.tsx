// routesConfig.js
import React from 'react';
import { CheckRole } from '../utils';
const Home = React.lazy(() => import('../pages/home'));


export const routesConfig = [
  {
    path: '/',
    element: <Home />,
    private: true,
     roles: [CheckRole.ADMIN, CheckRole.USER],
  },
  
];







