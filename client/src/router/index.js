// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/auth/Login.vue';
import Index from '../pages/dashboard/Index.vue';
// import Register from '@/pages/auth/Register.vue';

const routes = [
  { path: '/login', component: Login },
  
  {path: '/dashboard', component: Index},
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
