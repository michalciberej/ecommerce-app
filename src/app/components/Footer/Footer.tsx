import Logo from '@/app/components/Logo';
import RouteNavigation from '@/app/components/RouteNavigation';

const Footer = () => {
  return (
    <footer className='border-t border-neutral-500 py-4 px-2 flex flex-col gap-y-4 justify-center items-center'>
      <RouteNavigation />
      <Logo />
    </footer>
  );
};

export default Footer;
