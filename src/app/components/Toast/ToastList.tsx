'use client';

import { useToastContext } from '@/app/context/ToastContext';
import Toast from '@/app/components/Toast';

const ToastList = () => {
  const { toasts } = useToastContext();

  return (
    <div className='fixed z-10 top-0 right-0 bottom-0 w-80 flex flex-col-reverse p-2 pointer-events-none gap-y-3'>
      {toasts.map(({ id, message, type }) => (
        <Toast
          key={id}
          id={id}
          message={message}
          type={type}
        />
      ))}
    </div>
  );
};

export default ToastList;
