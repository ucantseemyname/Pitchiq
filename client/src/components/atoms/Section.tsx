import type { ReactNode } from 'react';
import { cn } from './cn';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface SectionProps {
  children: ReactNode;
  id?: string;
  /** Dark sections invert the palette (used for Results / Final CTA). */
  dark?: boolean;
  className?: string;
  /** Disable the default vertical padding. */
  flush?: boolean;
}

/** A full-width page section with consistent vertical rhythm and reveal. */
export function Section({ children, id, dark, className, flush }: SectionProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'reveal w-full',
        !flush && 'py-20 sm:py-28',
        dark && 'bg-ink text-white dark:bg-black',
        className,
      )}
    >
      <div className="container-px">{children}</div>
    </section>
  );
}
