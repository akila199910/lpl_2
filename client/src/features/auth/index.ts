import { lazy } from 'react';

export const authRoutes = [
  {
    path: '/auth/login',
    component: lazy(() => import('./pages/Login')),
  },
  {
    path: '/auth/register',
    component: lazy(() => import('./pages/Register')),
  },
  {
    path: '/auth/reset-password',
    component: lazy(() => import('./pages/ResetPassword')),
  },
];
