'use client';

import { useRef, useState } from 'react';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import postProduct from '@/app/actions/post/postProduct';
import { useRouter } from 'next/navigation';
import { useToastContext } from '@/app/context/ToastContext';

const ProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { refresh } = useRouter();
  const { addToast } = useToastContext();

  const handlePost = async (formData: FormData) => {
    setIsLoading(true);

    await postProduct(formData)
      .then((res) => {
        if (res.valid) {
          formRef.current?.reset();
          addToast(res.message, res.type);
          refresh();
        } else {
          addToast(res.message, res.type);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      action={handlePost}
      ref={formRef}
      className='flex gap-8 bg-neutral-100 p-4 ring-1 ring-inset ring-neutral-500 items-center rounded-md shadow-md'>
      <Input
        id='title'
        name='title'
        label='Title:'
        type='text'
        minLength={1}
        disabled={isLoading}
      />
      <Input
        id='price'
        name='price'
        label='Price:'
        type='number'
        min={0}
        disabled={isLoading}
      />
      <div className='flex gap-2 relative'>
        <Button
          type='submit'
          isLoading={isLoading}
          aria-label='Add Product'
          className='py-1 hover:bg-green-200 focus:bg-green-200'>
          <CheckIcon className='max-w-6 max-h-6 w-full' />
        </Button>
        <Button
          type='button'
          onClick={() => formRef.current?.reset()}
          aria-label='Cancel'
          className='py-1 hover:bg-rose-200 focus:bg-rose-200'>
          <XMarkIcon className='max-w-6 max-h-6 w-full ' />
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
