import { ReadonlyURLSearchParams } from 'next/navigation';
import { createPageURL } from './createPageURL';

describe('createPageURL', () => {
  it('should correctly reproduce new url with searchParams', () => {
    const pathname = 'localhost:3000/';
    const pageNumber = '1';
    const searchParams =
      `page=${pageNumber}` as unknown as ReadonlyURLSearchParams;
    const URL = `${pathname}?${searchParams}`;

    const newURL = createPageURL(pageNumber, searchParams, pathname);

    expect(newURL).toBe(URL);
  });
});
