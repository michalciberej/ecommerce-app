import Logo from '@/app/components/Logo';
import RouteNavigation from '@/app/components/RouteNavigation';

const Header = () => {
  return (
    <header className='w-full py-4 px-2 border-b border-neutral-500 flex justify-between items-center'>
      <Logo />
      <RouteNavigation />
    </header>
  );
};

export default Header;
