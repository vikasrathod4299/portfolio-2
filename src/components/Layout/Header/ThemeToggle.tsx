import { useEffect, useState } from 'react'
import { IconSun, IconMoon} from '@tabler/icons-react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      className="rounded px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'dark' ? <IconSun /> : <IconMoon />}
    </button>
  )
}
