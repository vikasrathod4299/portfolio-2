import { IconX, IconAlignLeft } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Navlink from './Navlink'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'

const navLinks = [
  { url: '/', label: 'Home' },
  { url: '/blog', label: 'Blog' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuShown, setMenuShown] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleResize = () => {
    setMenuShown(false)
  }
  const handleScroll = () => {
    const offset = window.scrollY
    setMenuShown(false)
    setIsScrolled(offset > 0)
  }

  return (
    <>
      <header
        className={classNames(
          ' bg-white/0 fixed z-50 transition-shadow dark:bg-zinc-900/0',
          'fixed w-full backdrop-blur-md',
          'h-16',
          { shadow: isScrolled,'bg-white/70': isScrolled , 'dark:bg-zinc-900/70': isScrolled},
        )}
      >
        <div className='mx-auto flex h-full max-w-3xl items-center justify-between px-3'>
          <button
            className="sm:hidden"
            onClick={() => setMenuShown(!menuShown)}
          >
            {menuShown ? <IconX /> : <IconAlignLeft />}
          </button>
          <h1 className="sm:text-3xl">Vikas Rathod</h1>
          <nav className="hidden gap-3 sm:flex">
            {navLinks.map(({ label, url }) => (
              <Navlink key={url} href={url} label={label} />
            ))}
            <ThemeToggle />
          </nav>
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <MobileMenu isOpen={menuShown}>
        {navLinks.map(({ label, url }) => (
          <Navlink
            key={url}
            href={url}
            label={label}
            onClick={() => setMenuShown(false)}
          />
        ))}
      </MobileMenu>
    </>
  )
}
