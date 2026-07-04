import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from './cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: 'up' | 'down' | 'left' | 'right' | 'scale';
  as?: 'div' | 'li' | 'section';
}

const OFFSETS: Record<NonNullable<RevealProps['from']>, string> = {
  up: 'translateY(28px)',
  down: 'translateY(-28px)',
  left: 'translateX(28px)',
  right: 'translateX(-28px)',
  scale: 'scale(0.94)',
};

/**
 * Scroll-reveal wrapper with directional entrance + optional stagger delay.
 * Reveals immediately for reduced-motion users.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = 'up',
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : OFFSETS[from],
        transition:
          'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
