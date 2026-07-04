import type { ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { cn } from './cn';

/**
 * Wraps a child (typically a Button) so it drifts toward the cursor on hover.
 * Inline-block so it hugs its content.
 */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLSpanElement>(strength);
  return (
    <span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn('inline-block transition-transform duration-300 ease-out', className)}
    >
      {children}
    </span>
  );
}
