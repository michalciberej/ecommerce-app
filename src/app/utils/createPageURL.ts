import { ReadonlyURLSearchParams } from 'next/navigation';

export const createPageURL = (
  pageNumber: number | string,
  searchParams: ReadonlyURLSearchParams,
  pathname: string
) => {
  const params = new URLSearchParams(searchParams);
  params.set('page', pageNumber.toString());
  return `${pathname}?${params.toString()}`;
};
