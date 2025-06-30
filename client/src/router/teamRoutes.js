import { requireAuth, requireRole } from './guards.js';

export default [
  {
    path: '/teams',
    component: () => import('../pages/admin/team/TeamList.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/teams/create',
    component: () => import('../pages/admin/team/TeamCreate.vue'),
    beforeEnter: requireAuth,
  },
  {
  path: '/teams/update/:id',
  name: 'TeamEdit',
  component: () => import('../pages/admin/team/TeamUpdate.vue'),
  beforeEnter: requireAuth,
}

];
