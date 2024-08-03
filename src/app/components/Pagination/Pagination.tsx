'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { createPageURL } from '@/app/utils/createPageURL';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const Pagination = ({ pagesCount }: { pagesCount: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

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
          <Link
            aria-label='Change to first page'
            href={createPageURL(1, searchParams, pathname)}
            className='rounded-md p-2 ring-1 ring-inset ring-neutral-500 bg-neutral-50 flex '>
            <ChevronDoubleLeftIcon className='w-4 h-4' />
          </Link>
        </li>
        {buttons.map(({ el, id }) => (
          <li key={id}>
            <Link
              aria-label={`Change to ${el} page`}
              href={createPageURL(el, searchParams, pathname)}
              className={twMerge(
                'rounded-md px-3 py-1 ring-1 ring-inset ring-neutral-500 bg-neutral-50 flex',
                currentPage === el && 'ring-2 ring-orange-500'
              )}>
              {el}
            </Link>
          </li>
        ))}
        <li>
          <Link
            aria-label='Change to last page'
            href={createPageURL(pagesCount, searchParams, pathname)}
            className='rounded-md p-2 ring-1 ring-inset ring-neutral-500 bg-neutral-50 flex'>
            <ChevronDoubleRightIcon className='w-4 h-4' />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
