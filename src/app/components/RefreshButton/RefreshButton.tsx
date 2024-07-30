'use client';

import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';

const RefreshButton = () => {
  const { refresh } = useRouter();

  return (
    <Button
      onClick={refresh}
      className='bg-sky-400 text-white ring-sky-600 ring-2 hover:bg-sky-500 focus:bg-sky-500'>
      Refresh
    </Button>
  );
};

export default RefreshButton;
