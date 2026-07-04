import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { Menu, X } from '../atoms/icons';
import { cn } from '../atoms/cn';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

/** Sticky landing navbar with glass effect on scroll and a mobile menu. */
export function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The hero is now a light bento layout, so the navbar always uses dark-on-light
  // styling (it just gains a glass background once scrolled or when the menu is
  // open). `overHero` is retained as a flag in case a dark hero returns.
  const overHero = false;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        (scrolled || menuOpen) && 'glass shadow-soft',
      )}
    >
      <nav className="container-px flex h-[72px] items-center justify-between">
        <Logo light={overHero} />

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                overHero
                  ? 'text-white/70 hover:text-white'
                  : 'text-muted hover:text-ink dark:hover:text-white',
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle light={overHero} />
          <Button size="sm" onClick={() => navigate('/generate')}>
            Get Started
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle light={overHero} />
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className={cn(
              'grid h-10 w-10 place-items-center rounded-full border',
              overHero
                ? 'border-white/15 text-white'
                : 'border-hairline text-ink dark:border-dark-hairline dark:text-white',
            )}
          >
            {menuOpen ? <X width={18} height={18} /> : <Menu width={18} height={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="glass border-t border-hairline px-5 pb-6 pt-2 md:hidden dark:border-dark-hairline">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-white/60 dark:text-white dark:hover:bg-white/[0.06]"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-3"
              fullWidth
              onClick={() => {
                setMenuOpen(false);
                navigate('/generate');
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
