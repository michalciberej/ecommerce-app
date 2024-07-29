import { twMerge } from 'tailwind-merge';

export type InputProps = {
  label: string;
  id: string;
  classNameLabel?: string;
  classNameInput?: string;
} & React.ComponentPropsWithoutRef<'input'>;

const Input = ({
  label,
  id,
  classNameLabel,
  classNameInput,
  ...props
}: InputProps) => {
  return (
    <label
      htmlFor={id}
      className={twMerge(
        'flex-1 flex gap-2 ring-1 ring-inset ring-neutral-500 rounded-md px-2 py-1 items-center',
        classNameLabel
      )}>
      {label}
      <input
        id={id}
        className={twMerge('w-full bg-transparent px-2', classNameInput)}
        {...props}
      />
    </label>
  );
};

export default Input;
