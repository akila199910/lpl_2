// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/auth/Login.vue';
// import Register from '@/pages/auth/Register.vue';

const routes = [
  { path: '/login', component: Login },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
