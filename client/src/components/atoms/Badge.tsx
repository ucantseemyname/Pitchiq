import type { ReactNode } from 'react';
import { cn } from './cn';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  /** Show the pulsing red dot to the left. */
  dot?: boolean;
  light?: boolean;
}

/** Small pill label used as a section eyebrow. */
export function Badge({ children, className, dot = true, light = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider',
        light
          ? 'border-white/15 bg-white/5 text-white/80'
          : 'border-hairline bg-white/70 text-muted dark:border-dark-hairline dark:bg-white/[0.04] dark:text-white/70',
        className,
      )}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
