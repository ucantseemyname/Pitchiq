import type { ReactNode } from 'react';
import { cn } from './cn';

/**
 * Editorial eyebrow label, uppercase, letter-spaced, with a short leading rule.
 * Used above section headlines for a refined, magazine-like feel.
 */
export function Eyebrow({
  children,
  light = false,
  className,
  center = false,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3',
        center && 'justify-center',
        className)}
    >
      <span className={cn('h-px w-8', light ? 'bg-white/40' : 'bg-ink/30 dark:bg-white/30')} />
      <span
        className={cn(
          'text-[11px] font-semibold uppercase tracking-[0.22em]',
          light ? 'text-white/70' : 'text-muted')}
      >
        {children}
      </span>
    </div>
  );
}
