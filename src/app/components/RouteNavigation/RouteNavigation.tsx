import getRoutes from '@/app/utils/getRoutes';
import Link from 'next/link';

const routes = getRoutes();

const RouteNavigation = () => {
  return (
    <nav>
      <ul className='flex-col sm:flex-row flex items-center sm:gap-6'>
        {routes.map(({ id, url, label }) => (
          <li key={id}>
            <Link
              href={url}
              className='font-bold tracking-wide'>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RouteNavigation;
