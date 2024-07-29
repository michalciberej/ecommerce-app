import { twMerge } from 'tailwind-merge';

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <span
      className={twMerge(
        'w-8 h-8 rounded-full inline-block border-t-4 border-white animate-spin',
        className
      )}></span>
  );
};

export default LoadingSpinner;
