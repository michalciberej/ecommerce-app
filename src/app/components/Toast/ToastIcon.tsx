import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const SuccessIcon = () => {
  return (
    <div className='rounded-full p-1 bg-green-400'>
      <CheckIcon className='w-6 h-6 text-white' />
    </div>
  );
};

export const WarningIcon = () => {
  return (
    <div className='rounded-full p-1 bg-orange-400'>
      <XMarkIcon className='w-6 h-6 text-white' />
    </div>
  );
};

export const ErrorIcon = () => {
  return (
    <div className='rounded-full p-1 bg-rose-400'>
      <XMarkIcon className='w-6 h-6 text-white' />
    </div>
  );
};
