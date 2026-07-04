import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from '../atoms/icons';
import { cn } from '../atoms/cn';

interface ThemeToggleProps {
  light?: boolean;
}

/** Light/dark mode switch. */
export function ThemeToggle({ light }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'grid h-10 w-10 place-items-center rounded-full border transition-colors',
        light
          ? 'border-white/15 text-white hover:bg-white/10'
          : 'border-hairline text-ink hover:bg-white/70 dark:border-dark-hairline dark:text-white dark:hover:bg-white/[0.06]',
      )}
    >
      {isDark ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
    </button>
  );
}
