import { useAuthStore } from '../store/auth';
import { createRouter, createWebHistory } from 'vue-router';
import authRoutes from './authRoutes';
import teamRoutes from './teamRoutes';
import dashboardRoutes from './dashboardRoutes';
import playerRoutes from './playerRoutes';
import auctionRoute from './auctionRoute';
import settingRoute from './settingRoute';

const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  ...teamRoutes,
  ...playerRoutes,
  ...auctionRoute,
  ...settingRoute
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  const publicPages = ['/login', '/register'];
  const isPublic = publicPages.includes(to.path);

  // Try to restore auth state if user is null
  if (!authStore.user) {
    await authStore.checkAuth();
  }

  const isLoggedIn = !!authStore.user;

  // If route is public and user is logged in → redirect to dashboard
  if (isPublic && isLoggedIn) {
    return next('/dashboard');
  }

  // If route requires auth and user is not logged in → redirect to login
  if (!isPublic && !isLoggedIn) {
    return next('/login');
  }

  return next();
});

export default router;
