import { useCountUp } from '../../hooks/useCountUp';
import { cn } from '../atoms/cn';

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  light?: boolean;
}

/** Animated stat with a count-up number and caption. */
export function StatCounter({ value, suffix, label, light }: StatCounterProps) {
  const { value: current, ref } = useCountUp<HTMLDivElement>({ end: value });

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div
        className={cn(
          'text-4xl font-extrabold tracking-tight sm:text-5xl',
          light ? 'text-white' : 'text-ink dark:text-white',
        )}
      >
        {current.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className={cn('text-sm font-medium', light ? 'text-white/60' : 'text-muted')}>
        {label}
      </div>
    </div>
  );
}
