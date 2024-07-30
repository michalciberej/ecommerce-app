import RefreshButton from '@/app/components/RefreshButton';

export interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className='w-full flex flex-col items-center justify-center h-[85dvh]'>
      <h1 className='text-3xl'>{message}</h1>
      <RefreshButton />
    </div>
  );
};

export default Error;
