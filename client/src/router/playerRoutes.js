
export default [
  {
    path: '/players',
    component: () => import('../pages/admin/player/Index.vue'),
  },
  {
    path: '/player/:id',
    component: () => import('../pages/admin/player/PlayerUpdate.vue'),
  },

];
