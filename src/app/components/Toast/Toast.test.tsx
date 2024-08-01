import { ToastContextProvider } from '@/app/context/ToastContext';
import { render } from '@testing-library/react';
import Toast from './Toast';

describe(Toast, () => {
  it('should auto remove itself after 5 seconds', () => {
    const { getByRole } = render(
      <ToastContextProvider>
        <Toast
          message='test'
          type='success'
          id='123'
        />
      </ToastContextProvider>
    );

    const toast = getByRole('alert');

    expect(toast).toBeInTheDocument();

    setTimeout(() => expect(toast).not.toBeInTheDocument(), 5000);
  });
});
