import { useAuthStore } from '../store/auth'
export async function requireAuth(to, from, next) {
  const authStore = useAuthStore();
  await authStore.checkAuth();

  if (authStore.user) {
    next();
  } else {
    next('/login');
  }
}

export function requireRole(role) {
  return (to, from, next) => {
    const user = store.state.user || JSON.parse(localStorage.getItem('user'));
    if (user && user.role === role) {
      next();
    } else {
      next('/unauthorized');
    }
  };
}
