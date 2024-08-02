import { useState, ChangeEvent } from 'react';

const QuantityInput = ({ id }: { id: string }) => {
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue(value > 1 ? value - 1 : 1);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setValue(value > 1 ? value : 1);
  };

  return (
    <label
      htmlFor={id}
      className='group ring-1 ring-inset ring-neutral-500 rounded-md flex text-center p-1'>
      <span className='sr-only'>Quantity</span>
      <input
        type='number'
        value={value}
        min={1}
        id={id}
        name='quantity'
        onChange={handleOnChange}
        className='w-8 pl-1 bg-transparent'
      />
      <div className='flex flex-col justify-between gap-y-1'>
        <button
          type='button'
          tabIndex={-1}
          onClick={handleIncrement}
          className='opacity-0 rounded-full ring-1 ring-inset ring-neutral-500 text-xs transition-all px-1 group-hover:opacity-100 group-focus:opacity-100 bg-neutral-50'>
          +
        </button>
        <button
          type='button'
          tabIndex={-1}
          onClick={handleDecrement}
          className='opacity-0 rounded-full ring-1 ring-inset ring-neutral-500 text-xs transition-all px-1 group-hover:opacity-100 group-focus:opacity-100 bg-neutral-50'>
          -
        </button>
      </div>
    </label>
  );
};

export default QuantityInput;
