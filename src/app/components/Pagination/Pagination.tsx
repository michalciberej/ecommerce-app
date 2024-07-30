'use client';

import { twMerge } from 'tailwind-merge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createPageURL } from '@/app/utils/createPageURL';

const Pagination = ({ pagesCount }: { pagesCount: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { replace } = useRouter();

  const buttons = Array(pagesCount)
    .fill(1)
    .map((el, index) => el + index);

  return (
    <div className='flex w-full justify-end'>
      <div className='flex w-full max-w-fit items-end gap-x-2 pt-2'>
        {buttons.map((page, index) => (
          <button
            key={page + index}
            type='button'
            onClick={() => replace(createPageURL(page, searchParams, pathname))}
            className={twMerge(
              'rounded-md px-3 py-1 ring-1 ring-inset ring-neutral-500 bg-neutral-50',
              currentPage === page && 'ring-2 ring-orange-500'
            )}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
