import { IconSun, IconMoon} from '@tabler/icons-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme} = useTheme()
  return (
    <button
      className="rounded px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <IconSun /> : <IconMoon />}
    </button>
  )
}
