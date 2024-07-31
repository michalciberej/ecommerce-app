import { render, fireEvent } from '@testing-library/react';
import { ToastContextProvider } from '@/app/context/ToastContext';
import DeleteButton from './DeleteButton';
import { useRouter } from 'next/navigation';

(useRouter as jest.Mock).mockReturnValue({
  refresh: jest.fn(),
});

describe(DeleteButton, () => {
  it('should display confirmation modal when button is clicked', () => {
    const { getByTestId } = render(
      <ToastContextProvider>
        <DeleteButton
          id='123'
          action={() => new Promise(() => {})}
        />
      </ToastContextProvider>
    );

    const button = getByTestId('delete-button');
    fireEvent.click(button);
    const modal = getByTestId('conf-modal-container');

    expect(modal).toBeInTheDocument();
  });
  it('when Escape key is pressed while modal is opened it closes the modal', () => {
    const { getByTestId } = render(
      <ToastContextProvider>
        <DeleteButton
          id='123'
          action={() => new Promise(() => {})}
        />
      </ToastContextProvider>
    );

    const button = getByTestId('delete-button');
    fireEvent.click(button);
    const modal = getByTestId('conf-modal');
    fireEvent.keyDown(modal, {
      key: 'Escape',
    });

    expect(modal).not.toBeInTheDocument();
  });

  it('when Tab or Shift-Tab are pressed inside the modal element the focus should not escape the modal', () => {
    const { getByTestId, getByText } = render(
      <ToastContextProvider>
        <DeleteButton
          id='123'
          action={() => new Promise(() => {})}
        />
      </ToastContextProvider>
    );

    const button = getByTestId('delete-button');
    fireEvent.click(button);

    const modal = getByTestId('conf-modal');
    // There are only 2 focusable elements =>cancel button and delete button
    const deleteButton = getByText('Delete');
    const cancelButton = getByText('Cancel');

    fireEvent.keyDown(modal, {
      key: 'Tab',
      shiftKey: true,
    });

    expect(deleteButton).toHaveFocus();

    fireEvent.keyDown(modal, {
      key: 'Tab',
    });

    expect(cancelButton).toHaveFocus();
  });
});
