// routesConfig.js
import React from 'react';
import { CheckRole } from '../utils';
const Home = React.lazy(() => import('../pages/home'));
const ProxyCreate = React.lazy(() => import('../pages/proxy/create'));
const ProxyManage = React.lazy(() => import('../pages/proxy/manage'));
const Traffic = React.lazy(() => import('../pages/traffic'));


export const routesConfig = [
  {
    path: '/',
    element: <Home />,
    private: true,
    roles: [CheckRole.ADMIN, CheckRole.USER],
  },

  {
    path: '/quan-ly-proxy/them-moi',
    element: <ProxyCreate />,
    private: true,
    roles: [CheckRole.ADMIN, CheckRole.USER],
  },

    {
    path: '/quan-ly-proxy/cap-nhat/:id',
    element: <ProxyCreate />,
    private: true,
    roles: [CheckRole.ADMIN, CheckRole.USER],
  },

  {
    path: '/quan-ly-proxy',
    element: <ProxyManage />,
    private: true,
    roles: [CheckRole.ADMIN, CheckRole.USER],
  },

   {
    path: '/traffic-website',
    element: <Traffic />,
    private: true,
    roles: [CheckRole.ADMIN, CheckRole.USER],
  },

];







