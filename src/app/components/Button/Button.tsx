import { SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export type ButtonProps = {
  className?: string;
  isLoading?: boolean;
  action?: () => void | React.Dispatch<SetStateAction<boolean>>;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = ({
  children,
  className,
  action,
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={action}
      className={twMerge(
        'rounded-md text-xl py-1 px-2 ring-1 ring-inset ring-neutral-500 bg-neutral-50 transition-colors',
        className
      )}
      {...props}>
      {isLoading ? <LoadingSpinner className='w-6 h-6' /> : children}
    </button>
  );
};

export default Button;
