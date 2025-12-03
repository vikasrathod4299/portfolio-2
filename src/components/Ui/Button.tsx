import { IconLoader2 } from '@tabler/icons-react';
import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  children,
  className,
  loading = false,
  ...props
}: Props) {
  return (
    <button
      className={classNames(
        'relative flex rounded-md border px-4 py-2.5',
        'border-gray-800 bg-transparent text-gray-800',
        'dark:border-white/80 dark:bg-transparent dark:text-white',
        'hover:bg-gray-800 hover:text-white',
        'dark:hover:bg-white/90 dark:hover:text-gray-900',
        'active:scale-[0.98] transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'disabled:hover:bg-transparent disabled:hover:text-gray-800',
        'dark:disabled:hover:bg-transparent dark:disabled:hover:text-white',
        className
      )}
      {...props}
    >
      <span className="mx-auto flex gap-3 font-semibold text-sm uppercase tracking-wider">
        {loading ? <IconLoader2 className="animate-spin" /> : null} {children}
      </span>
    </button>
  );
}
