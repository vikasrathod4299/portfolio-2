import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ children, className, ...rest }: Props) {
  return (
    <input
      className={classNames(
        'py-3 px-4  appearance-none border',
        'rounded border-zinc-300 bg-zinc-50',
        'dark:border-zinc-600 dark:bg-zinc-800',
        'focus:border-sky-500 focus:ring-sky-500',
        'dark:focus:border-sky-700 dark:focus:ring-sky-700',
        className
      )}
      {...rest}
    >
      {children}
    </input>
  );
}
