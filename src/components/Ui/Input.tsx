import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ children, className, ...rest }: Props) {
  return (
    <input
      className={classNames(
        'py-3 px-4 appearance-none border text-sm',
        'rounded-md border-gray-800 bg-transparent',
        'dark:border-white/80 dark:bg-transparent',
        'text-gray-800 dark:text-gray-200',
        'placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-white/80',
        'transition-all duration-200',
        className
      )}
      {...rest}
    >
      {children}
    </input>
  );
}
