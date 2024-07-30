export type ToastTypeUnion = 'success' | 'error' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastTypeUnion;
}
