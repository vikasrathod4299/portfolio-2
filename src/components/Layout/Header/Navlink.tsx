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
                    'bg-sky-300/30 text-sky-500 dark:bg-sky-900/30 dark:text-sky-200':
                    active,
                    'hover:bg-zinc-200/20 dark:hover:bg-zinc-200/10': !active
                })
            }
            onClick={onClick}
        >
            {label}
        </Link>
    )
}