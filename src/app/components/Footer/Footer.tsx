import Logo from '@/app/components/Logo';
import RouteNavigation from '@/app/components/RouteNavigation';
import ScrollUpButton from '../ScrollUpButton';

const Footer = () => {
  return (
    <footer className='border-t border-neutral-500 py-4 px-2 relative'>
      <div className='flex flex-col gap-y-4 justify-center items-center'>
        <RouteNavigation />
        <Logo />
      </div>
      <ScrollUpButton />
    </footer>
  );
};

export default Footer;
