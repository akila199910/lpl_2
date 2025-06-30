import Index from '../pages/dashboard/Index.vue';
import { requireAuth } from './guards';

export default  [  
  {
    path: '/dashboard', 
    component: Index,
    beforeEnter: requireAuth,
},
  
];