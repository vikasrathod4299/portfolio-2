import classNames from 'classnames';
import type { ReactNode } from 'react';

interface Props {
  url: string;
  icon: ReactNode;
}

export default function SocialIcon({ icon, url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        'p-2 border border-gray-800 dark:border-white/80',
        'text-gray-700 dark:text-gray-300',
        'hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900',
        'transition-all duration-200 active:scale-95'
      )}
    >
      {icon}
    </a>
  );
}
