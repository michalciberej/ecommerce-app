'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createPageURL } from '@/app/utils/createPageURL';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

const Pagination = ({ pagesCount }: { pagesCount: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { replace } = useRouter();

  const buttons = Array(pagesCount)
    .fill(1)
    .map((el, index) => {
      return { el: el + index, id: uuid() };
    })
    .filter(({ el }) => {
      const prev = currentPage - 1;
      const next = currentPage + 1;

      const valid = el === prev || el === currentPage || el === next;

      return valid;
    });

  if (pagesCount <= 0) return;

  return (
    <nav className='flex w-full justify-end'>
      <ul className='flex w-full max-w-fit items-end gap-x-2 pt-2'>
        <li>
          <button
            type='button'
            aria-label='Change to first page'
            onClick={() => replace(createPageURL(1, searchParams, pathname))}
            className='rounded-md p-2 ring-1 ring-inset ring-neutral-500 bg-neutral-50 flex '>
            <ChevronDoubleLeftIcon className='w-4 h-4' />
          </button>
        </li>
        {buttons.map(({ el, id }) => (
          <li key={id}>
            <button
              type='button'
              aria-label={`Change to ${el} page`}
              onClick={() => replace(createPageURL(el, searchParams, pathname))}
              className={twMerge(
                'rounded-md px-3 py-1 ring-1 ring-inset ring-neutral-500 bg-neutral-50 flex',
                currentPage === el && 'ring-2 ring-orange-500'
              )}>
              {el}
            </button>
          </li>
        ))}
        <li>
          <button
            type='button'
            aria-label='Change to last page'
            onClick={() =>
              replace(createPageURL(pagesCount, searchParams, pathname))
            }
            className='rounded-md p-2 ring-1 ring-inset ring-neutral-500 bg-neutral-50 flex'>
            <ChevronDoubleRightIcon className='w-4 h-4' />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
