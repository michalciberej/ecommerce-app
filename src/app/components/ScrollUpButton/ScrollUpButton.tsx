'use client';

import { ChevronUpIcon } from '@heroicons/react/24/outline';

const ScrollUpButton = () => {
  const handleScroll = () => window.scroll(0, 0);

  return (
    <button
      onClick={handleScroll}
      type='button'
      aria-label='Scroll to top of the page'
      className='p-1 rounded-full bg-orange-400 absolute bottom-4 right-4'>
      <ChevronUpIcon className='w-6 h-6 text-neutral-50' />
    </button>
  );
};

export default ScrollUpButton;
