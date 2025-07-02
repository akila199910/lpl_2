
export default [
  {
    path: '/teams',
    component: () => import('../pages/admin/team/TeamList.vue'),
  },
  {
    path: '/teams/create',
    component: () => import('../pages/admin/team/TeamCreate.vue'),
  },
  {
  path: '/teams/update/:id',
  name: 'TeamEdit',
  component: () => import('../pages/admin/team/TeamUpdate.vue'),
}

];
