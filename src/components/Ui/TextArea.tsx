import classNames from 'classnames';
import type { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ children, className, ...rest }: Props) {
  return (
    <textarea
      className={classNames(
        'py-3 px-4 text-sm appearance-none border',
        'rounded border-zinc-300 bg-zinc-50',
        'dark:border-zinc-600 dark:bg-zinc-800',
        'focus:border-primary-500 focus:ring-primary-500',
        'dark:focus:border-primary-700 dark:focus:ring-primary-700',
        className
      )}
      {...rest}
    >
      {children}
    </textarea>
  );
}
