import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  isDesktop?: boolean;
}

export default function ExperienceTab({
  label,
  active = false,
  isDesktop = false,
  ...rest
}: Props) {
  // Desktop version - brutalist style with right border indicator
  if (isDesktop) {
    return (
      <button
        className={classNames(
          'w-full px-5 py-4 text-left text-sm font-semibold transition-all duration-200',
          'border-r-4 -mr-[2px]',
          active
            ? 'bg-gray-800 dark:bg-white text-white dark:text-gray-900 border-r-gray-800 dark:border-r-white'
            : 'bg-transparent text-gray-600 dark:text-gray-400 border-r-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
        )}
        {...rest}
      >
        {label}
      </button>
    );
  }

  // Mobile version - pill style
  return (
    <button
      className={classNames(
        'px-3 py-1.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap',
        'rounded-md border border-gray-800 dark:border-white/80',
        active
          ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900'
          : 'bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900'
      )}
      {...rest}
    >
      {label}
    </button>
  );
}
