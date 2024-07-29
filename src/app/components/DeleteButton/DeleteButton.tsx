'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';

export interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<{
    valid: boolean;
    message: string;
  }>;
}

const DeleteButton = ({ id, action }: DeleteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
          refresh();
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <button
        type='button'
        aria-label='Delete Product'
        onClick={handleOpen}
        className='hover:ring-1 focus:ring-1 transition-all ring-inset ring-neutral-500 p-1 rounded-md'>
        <XMarkIcon className='w-full max-w-6 max-h-6' />
      </button>
      {isOpen && (
        <div
          className={'absolute inset-0 z-10  flex items-center justify-center'}>
          <div
            className='bg-neutral-800/50 w-full h-full absolute'
            onClick={handleOpen}></div>
          <div className='flex flex-col gap-4 w-4/5 lg:w-1/3 bg-neutral-200 p-4 relative z-20 rounded-md shadow-md ring-1 ring-inset ring-neutral-500'>
            <h3 className='text-2xl'>Are you sure?</h3>
            <p className='flex-1'>
              By deleting this record you may accidentaly delete other related
              data!
            </p>
            <div className='flex gap-3 justify-end'>
              <Button
                type='button'
                isLoading={isLoading}
                onClick={handleDelete}
                className='bg-rose-700 text-neutral-100 ring-2 ring-rose-700 hover:bg-rose-600 focus:bg-rose-600 flex items-center justify-center'>
                Delete
              </Button>
              <Button
                type='button'
                onClick={handleOpen}
                className='hover:bg-neutral-100 focus:bg-neutral-100'>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
