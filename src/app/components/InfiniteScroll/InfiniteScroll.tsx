'use client';

import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import ProductCard from '@/app/components/ProductCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import getProducts from '@/app/actions/get/getProducts';
import useInView from '@/app/hooks/useInView';

export interface InfiniteScrollProps {
  initialData: Product[];
  records: number;
}

const InfiniteScroll = ({ initialData, records }: InfiniteScrollProps) => {
  const [products, setproducts] = useState<Product[]>(initialData);
  const [offset, setOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [noDataLeft, setNoDataLeft] = useState(false);
  const { ref, inView } = useInView<HTMLLIElement>();

  const handleFetch = async () => {
    const newData = await getProducts(records, records * offset);
    setproducts(products.concat(newData.products));
    return newData.products.length;
  };

  useEffect(() => {
    if (!inView) return;
    if (noDataLeft) return;

    setIsLoading(true);

    handleFetch()
      .then((res) => {
        if (res <= 0) setNoDataLeft(true);
      })
      .finally(() => setIsLoading(false));

    setOffset(offset + 1);
  }, [inView]);

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 lg:gap-y-12'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product as Product}
        />
      ))}
      {!noDataLeft && (
        <li
          ref={ref}
          className='sm:col-span-2 md:col-span-3 lg:col-span-4 w-full flex justify-center'>
          {isLoading && <LoadingSpinner />}
        </li>
      )}
    </ul>
  );
};

export default InfiniteScroll;
