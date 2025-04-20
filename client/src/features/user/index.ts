import { lazy } from 'react';

export const userRoutes = [
    {
        path: '/user/my-profile',
        component: lazy(() => import('./pages/MyProfile')),
    },
    {
        path:'/',
        component: lazy(() => import('../../components/Loader')),
    },
    {
        path:'/home',
        component: lazy(() => import('./pages/Home')),
    }
    
]