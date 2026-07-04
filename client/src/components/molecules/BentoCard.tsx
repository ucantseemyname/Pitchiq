import type { ReactNode } from 'react';
import { cn } from '../atoms/cn';
import { useTilt } from '../../hooks/useTilt';

type Variant = 'light' | 'dark' | 'red' | 'outline';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  /** Enable pointer-reactive 3D tilt. */
  tilt?: boolean;
  /** Show a sweeping light "shine" on hover. */
  shine?: boolean;
  as?: 'div' | 'button' | 'a';
  onClick?: () => void;
}

const VARIANTS: Record<Variant, string> = {
  light:
    'bg-white text-ink border border-hairline shadow-soft dark:bg-dark-surface dark:text-white dark:border-dark-hairline',
  // In dark mode a flat #0a0a0a tile would vanish into the page, so dark tiles
  // gain a subtle top-lit gradient + border to read as elevated cards.
  dark: 'bg-ink text-white border border-white/10 dark:bg-gradient-to-br dark:from-[#1d1d20] dark:to-[#121214] dark:border-white/[0.08]',
  red: 'bg-primary text-white border border-primary',
  outline:
    'bg-transparent text-ink border border-hairline dark:text-white dark:border-dark-hairline',
};

/**
 * A rounded bento tile. Optional 3D tilt on hover and a diagonal shine sweep.
 * Wrap groups of these in a CSS grid to build bento layouts.
 */
export function BentoCard({
  children,
  className,
  variant = 'light',
  tilt = false,
  shine = false,
  as = 'div',
  onClick,
}: BentoCardProps) {
  const tiltProps = useTilt<HTMLDivElement>({ max: 6, scale: 1.015 });
  const Tag = as as 'div';

  return (
    <Tag
      ref={tilt ? tiltProps.ref : undefined}
      onPointerMove={tilt ? tiltProps.onPointerMove : undefined}
      onPointerLeave={tilt ? tiltProps.onPointerLeave : undefined}
      onClick={onClick}
      className={cn(
        'group/bento relative overflow-hidden rounded-[20px] p-6 transition-shadow duration-300',
        'motion-safe:transition-transform will-change-transform',
        tilt && 'hover:shadow-card',
        VARIANTS[variant],
        className,
      )}
    >
      {shine && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
        >
          <span className="absolute -inset-y-8 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </span>
      )}
      <div className="relative z-20 h-full">{children}</div>
    </Tag>
  );
}
