import RouteNavigation from './RouteNavigation';
import { render } from '@testing-library/react';
import getRoutes from '@/app/utils/getRoutes';

describe(RouteNavigation, () => {
  it('should display corrent amount of routes', () => {
    const routes = getRoutes();
    const { getAllByRole } = render(<RouteNavigation />);
    const links = getAllByRole('link');
    expect(links).toHaveLength(routes.length);
  });
});
