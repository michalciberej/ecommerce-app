'use client';

import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';

const RefreshButton = () => {
  const { refresh } = useRouter();

  return (
    <Button
      onClick={refresh}
      className='bg-orange-400 text-white ring-orange-600 ring-2 hover:bg-orange-500 focus:bg-orange-500'>
      Refresh
    </Button>
  );
};

export default RefreshButton;
