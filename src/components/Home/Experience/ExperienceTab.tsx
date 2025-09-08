import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

export default function ExperienceTab({
  label,
  active = false,
  ...rest
}: Props) {
  return (
    <button
      className={classNames(
        'w-full border-l border-l-zinc-200 px-5 py-3 text-left font-bold transition-colors',
        'hover:bg-sky-100 hover:text-primary-500',
        'dark:border-l-zinc-600 dark:hover:bg-opacity-20',
        'dark:hover:bg-sky-900 dark:hover:text-primary-500',
        {
          '!border-primary-500 bg-sky-100 text-primary-500 dark:bg-sky-900 dark:!bg-opacity-20 dark:text-primary-500':
            active
        }
      )}
      {...rest}
    >
      {label}
    </button>
  );
}
