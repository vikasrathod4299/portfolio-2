import cx from 'classnames'
import {Link, useLocation} from '@tanstack/react-router'


interface Props {
    href: string
    label: string
    onClick?: () => void
}


export default function Navlink({href, label, onClick}: Props) {
    const location =  useLocation();
    const active = location.pathname === href;

    return (
        <Link
            to={href}
            className={cx('px-5 py-5 transition-colors sm:rounded sm:px-3 sm:py-2', {
                    'bg-primary-300 text-primary-500 dark:bg-primary-900 dark:text-primary-200':
                    active,
                    'bg-zinc-200/80 dark:hover:bg-zinc-800/20': !active
                })
            }
            onClick={onClick}
        >
            {label}
        </Link>
    )
}