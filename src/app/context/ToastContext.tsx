'use client';

import { useContext, useState, createContext } from 'react';
import { ToastTypeUnion } from '@/app/components/Toast';
import createToast from '@/app/utils/createToast';

export interface ToastType {
  id: string;
  type: ToastTypeUnion;
  message: string;
}

export interface ToastContextType {
  toasts: ToastType[];
  addToast: (message: string, type: ToastTypeUnion) => void;
  removeToast: (id: string) => void;
  autoRemoveToast: (id: string, time?: number) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (message: string, type: ToastTypeUnion) => {
    const toast = createToast(message, type);
    setToasts(toasts.concat(toast));
  };

  const removeToast = (id: string) => {
    setToasts(toasts.filter((el) => el.id !== id));
  };

  const autoRemoveToast = (id: string, time: number = 5000) => {
    setTimeout(() => {
      removeToast(id);
    }, time);
  };

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, autoRemoveToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context)
    throw new Error('useToastContext must be used within ToastContextProvider');

  return context;
};
