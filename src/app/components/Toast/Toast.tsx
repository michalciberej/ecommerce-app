'use client';

import { useToastContext } from '@/app/context/ToastContext';
import { SuccessIcon, WarningIcon, ErrorIcon } from '@/app/components/Toast';
import { ToastProps } from '@/app/components/Toast';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Toast = ({ message, type, id }: ToastProps) => {
  const { autoRemoveToast, removeToast } = useToastContext();

  const iconMap = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
  };

  const toastIcon = iconMap[type] || null;

  autoRemoveToast(id);

  return (
    <div
      role='alert'
      className='w-full h-20 rounded-xl p-4 bg-white flex shadow-lg ring-1 ring-inset ring-neutral-400 relative z-[15] pointer-events-auto'>
      <div className='flex gap-8 items-center justify-between w-full text-wrap '>
        {toastIcon}
        <p className='text-neutral-700 text-wrap'>{message}</p>
      </div>
      <button onClick={() => removeToast(id)}>
        <XMarkIcon className='w-6 h-6' />
      </button>
    </div>
  );
};

export default Toast;
