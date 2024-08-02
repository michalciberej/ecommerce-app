import { fireEvent, render } from '@testing-library/react';
import ScrollUpButton from './ScrollUpButton';

describe(ScrollUpButton, () => {
  it('should scroll to top when clicked', () => {
    const scrollFn = (window.scroll = jest.fn());

    const { getByRole } = render(<ScrollUpButton />);
    fireEvent.click(getByRole('button'));

    expect(scrollFn).toHaveBeenCalled();
  });
});
