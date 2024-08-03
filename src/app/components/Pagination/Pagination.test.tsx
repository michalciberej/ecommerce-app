import { useSearchParams, useRouter } from 'next/navigation';
import { render } from '@testing-library/react';
import Pagination from './Pagination';

(useSearchParams as jest.Mock).mockReturnValue({
  get: jest.fn(),
});
(useRouter as jest.Mock).mockReturnValue({
  replace: jest.fn(),
});

describe(Pagination, () => {
  it('should not render any content if pageCount prop <= 0', () => {
    const pageCount = 0;

    const { queryByRole } = render(<Pagination pagesCount={pageCount} />);
    const navEl = queryByRole('navigation');

    expect(navEl).not.toBeInTheDocument();
  });

  it('should render 4 buttons if currently on first/last page', () => {
    const pageCount = 10;

    const { getAllByRole } = render(<Pagination pagesCount={pageCount} />);
    const buttonEls = getAllByRole('link');

    expect(buttonEls).toHaveLength(4);
  });

  it('should render 5 buttons if on page 5 out of 10', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => 5),
    });
    const pageCount = 10;

    const { getAllByRole } = render(<Pagination pagesCount={pageCount} />);
    const buttonEls = getAllByRole('link');

    expect(buttonEls).toHaveLength(5);
  });
});
