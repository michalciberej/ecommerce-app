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
              className='font-bold tracking-wide after:content-[""] after:w-0 after:h-[1px] after:bg-neutral-800 after:block after: after:origin-left after:transition-all hover:after:w-full'>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RouteNavigation;
