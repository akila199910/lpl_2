import { authRoutes } from '../features/auth';
import { userRoutes } from '../features/user';
// import { productRoutes } from '../features/product';

const routes = [
  ...authRoutes,
  ...userRoutes,
//   ...productRoutes,
];

export default routes;
