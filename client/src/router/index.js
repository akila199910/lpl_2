import { useAuthStore } from '../store/auth';
import { createRouter, createWebHistory } from 'vue-router';
import authRoutes from './authRoutes';
// import userRoutes from './userRoutes';
import teamRoutes from './teamRoutes';
import dashboardRoutes from './dashboardRoutes'
import playerRoutes from './playerRoutes'
import auctionRoute from './auctionRoute';
import settingRoute from './settingRoute';

// Combine all route arrays into one
const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  // ...userRoutes,
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
  const publicPages = ['/login', '/register'];
  const isPublic = publicPages.includes(to.path);

  const authStore = useAuthStore();

  if (!authStore.user && !isPublic) {
    await authStore.checkAuth();
  }

  if (authStore.user && isPublic) {
    return next('/dashboard');
  }

  next();
});

export default router;
