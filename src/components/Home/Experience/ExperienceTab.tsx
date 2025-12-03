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
        // Base styles
        'px-3 py-1.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap',
        // Mobile: pill style with border (brutalist style)
        'rounded-md sm:rounded-none border border-gray-800 dark:border-white/80 sm:border-0',
        // Desktop: left border style
        'sm:w-full sm:border-l-2 sm:px-5 sm:py-3 sm:text-left sm:text-sm',
        // Default state
        'text-gray-800 dark:text-gray-200',
        'bg-transparent sm:bg-transparent',
        'sm:border-l-gray-200 sm:dark:border-l-zinc-700',
        // Hover state
        'hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900',
        'sm:hover:bg-transparent sm:hover:text-primary-500 dark:sm:hover:bg-transparent dark:sm:hover:text-primary-400',
        'sm:hover:border-l-primary-500',
        // Active state
        {
          'bg-gray-800 text-white dark:bg-white dark:text-gray-900 sm:bg-transparent sm:text-primary-500 dark:sm:bg-transparent dark:sm:text-primary-400 sm:border-l-primary-500 sm:dark:border-l-primary-400':
            active
        }
      )}
      {...rest}
    >
      {label}
    </button>
  );
}
