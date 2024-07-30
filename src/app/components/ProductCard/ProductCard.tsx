import { Product } from '@prisma/client';
import Image from 'next/image';
import Button from '@/app/components/Button';
import postOrder from '@/app/actions/post/postOrder';
import { useMemo, useState } from 'react';
import { useToastContext } from '@/app/context/ToastContext';

const COLORS = [
  '#5D9B9B',
  '#721422',
  '#F8F32B',
  '#317F43',
  '#84C3BE',
  '#FFA420',
  '#3E5F8A',
  '#A18594',
  '#9E9764',
  '#F5D033',
];

const ProductCard = ({ product }: { product: Product }) => {
  const { id, price, title } = product;
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastContext();

  const colorIndex = useMemo(() => Math.floor(Math.random() * 10), []);

  // causes server mismatch
  // add sizes to Image

  const handlePost = async (formData: FormData) => {
    setIsLoading(true);

    await postOrder(formData, id)
      .then((res) => {
        if (res.valid) {
          addToast(res.message, res.type);
        } else {
          addToast(res.message, res.type);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='p-2 ring-1 ring-inset ring-neutral-500 shadow-md rounded-md gap-y-4 flex flex-col bg-neutral-200'>
      <div className='flex justify-between'>
        <span className='text-2xl capitalize'>{title}</span>
        <div className='flex gap-1 text-2xl'>
          <span>{price}</span>
          <span>Kč</span>
        </div>
      </div>
      <div className='relative overflow-hidden rounded-md w-full max-w-[700px] aspect-video'>
        <Image
          src={'/placeholder.jpg'}
          alt={`Image of ${title} product`}
          fill
          priority
        />

        <div
          className='w-full h-full opacity-50 absolute inset-0 z-10'
          style={{ backgroundColor: COLORS[colorIndex] }}></div>
      </div>
      <form
        action={handlePost}
        className='flex justify-between items-center'>
        <label
          htmlFor={title + id}
          className='sr-only'>
          Quantity
        </label>
        <input
          type='number'
          name='quantity'
          id={title + id}
          min={1}
          className='bg-transparent ring-1 ring-inset ring-neutral-500 rounded-md flex w-16 p-2 text-center'
        />
        <Button
          className='p-2'
          isLoading={isLoading}>
          Buy
        </Button>
      </form>
    </div>
  );
};

export default ProductCard;