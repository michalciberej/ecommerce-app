import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Error from '@/app/components/Error';

(useRouter as jest.Mock).mockReturnValue({
  refresh: jest.fn(),
});

describe(Error, () => {
  it('should correctly display message prop', () => {
    const prop = 'test';
    const { getByRole } = render(<Error message={prop} />);
    const message = getByRole('heading').textContent;
    expect(message).toBe(prop);
  });
});
