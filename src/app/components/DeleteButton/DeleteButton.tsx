'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import { ToastTypeUnion } from '@/app/components/Toast';
import { useToastContext } from '@/app/context/ToastContext';

export interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<{
    valid: boolean;
    type: ToastTypeUnion;
    message: string;
  }>;
}

const DeleteButton = ({ id, action }: DeleteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToastContext();
  const { refresh } = useRouter();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    setIsLoading(true);

    await action(id)
      .then((res) => {
        if (res.valid) {
          setIsOpen(false);
          addToast(res.message, res.type);
          refresh();
        } else {
          addToast(res.message, res.type);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const modalElement = modalRef.current;
      const focusableElement = modalElement.querySelectorAll('button');

      focusableElement[0].focus();

      const handleFocus = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === focusableElement[0]) {
            e.preventDefault();
            focusableElement[focusableElement.length - 1].focus();
          } else if (
            !e.shiftKey &&
            document.activeElement ===
              focusableElement[focusableElement.length - 1]
          ) {
            e.preventDefault();
            focusableElement[0].focus();
          }
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      modalElement.addEventListener('keydown', handleFocus);
      modalElement.addEventListener('keydown', handleEscape);

      return () => {
        modalElement.removeEventListener('keydown', handleFocus);
        modalElement.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  return (
    <>
      <button
        type='button'
        data-testid='delete-button'
        aria-label='Delete product'
        onClick={handleOpen}
        className='hover:ring-1 focus:ring-1 transition-all ring-inset ring-neutral-500 p-1 rounded-md'>
        <XMarkIcon className='w-6 h-6' />
      </button>
      {isOpen && (
        <div
          data-testid='conf-modal-container'
          className={'fixed inset-0 z-10  flex items-center justify-center'}>
          <div
            className='bg-neutral-800/50 w-full h-full absolute'
            onClick={handleOpen}></div>
          <div
            ref={modalRef}
            data-testid='conf-modal'
            className='flex flex-col gap-4 w-4/5 lg:w-1/3 bg-neutral-200 p-4 relative z-20 rounded-md shadow-md ring-1 ring-inset ring-neutral-500'>
            <h3 className='text-2xl'>Are you sure?</h3>
            <p className='flex-1'>
              By deleting this record you may accidentaly delete other related
              data!
            </p>
            <div className='flex gap-3 justify-end'>
              <Button
                type='button'
                onClick={handleOpen}
                className='hover:bg-neutral-100 focus:bg-neutral-100'>
                Cancel
              </Button>
              <Button
                type='button'
                isLoading={isLoading}
                onClick={handleDelete}
                className='bg-rose-700 text-neutral-100 ring-2 ring-rose-700 hover:bg-rose-600 focus:bg-rose-600 flex items-center justify-center'>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
