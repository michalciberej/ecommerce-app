import type { Route } from '../types';
import { v4 as uuid } from 'uuid';

const getRoutes = () => {
  const routes: Route[] = [
    {
      label: 'Product Management',
      url: 'product-management',
      id: uuid(),
    },
    {
      label: 'List of Orders',
      url: 'list-of-orders',
      id: uuid(),
    },
  ];

  return routes;
};

export default getRoutes;
