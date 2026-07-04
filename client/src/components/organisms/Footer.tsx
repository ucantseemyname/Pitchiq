import { Logo } from '../atoms/Logo';

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

/** Minimal landing footer. */
export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas dark:border-dark-hairline dark:bg-dark-canvas">
      <div className="container-px flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-sm text-muted">
            AI proposals for freelancers &amp; agencies.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-muted">
          © {new Date().getFullYear()} PitchIQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
