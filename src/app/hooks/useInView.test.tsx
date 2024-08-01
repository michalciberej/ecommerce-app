import useInView from './useInView';
import { fireEvent, render, renderHook } from '@testing-library/react';
import { forwardRef, RefObject } from 'react';

const TestComponent = forwardRef(function TestComponent(props, ref) {
  return (
    <div className='flex flex-col'>
      <div className='h-[3000px]'></div>
      <div ref={ref as RefObject<HTMLDivElement>}>target</div>
    </div>
  );
});

describe('useInView', () => {
  const mObserver = {
    observe: jest.fn(),
    unobserve: jest.fn(),
  };

  const mIntersectionObserver = jest.fn();
  mIntersectionObserver.mockImplementation((callback) => {
    callback([{ isIntersecting: true }], mObserver);
    return mObserver;
  });
  window.IntersectionObserver = mIntersectionObserver;

  it.skip('should detect if ref is in the viewport and return boolean', () => {
    const { result } = renderHook(useInView);
    const { ref, inView } = result.current;

    const { getByText } = render(<TestComponent ref={ref} />);

    expect(inView).toBe(false);

    const targetEl = getByText('target');
    fireEvent.scroll(targetEl, { target: { scrollY: 3000 } });

    expect(inView).toBe(true);
  });
});
