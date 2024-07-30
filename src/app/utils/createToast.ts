import { v4 as uuid } from 'uuid';
import { ToastType } from '@/app/context/ToastContext';
import { ToastTypeUnion } from '@/app/components/Toast';

const createToast = (message: string, type: ToastTypeUnion): ToastType => {
  return { id: uuid(), message, type };
};

export default createToast;
