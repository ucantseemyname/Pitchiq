import { Link } from 'react-router-dom';
import { Logo } from '../atoms/Logo';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { ArrowRight } from '../atoms/icons';

/** Slim header used on the form and proposal pages. */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-xl dark:border-dark-hairline dark:bg-dark-canvas/80">
      <div className="container-px flex h-[68px] items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink dark:hover:text-white"
          >
            Back to home
            <ArrowRight width={15} height={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}
