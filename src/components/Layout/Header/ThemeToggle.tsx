import { IconSun, IconMoon} from '@tabler/icons-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme} = useTheme()
  return (
    <button
      className="relative flex items-center justify-center size-9 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/20 transition-all duration-200"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
    </button>
  )
}
