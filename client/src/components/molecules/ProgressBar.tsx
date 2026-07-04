import { cn } from '../atoms/cn';

interface ProgressBarProps {
  current: number; // 1-based current step
  total: number;
  labels: string[];
}

/** Multi-step progress indicator with labeled dots and a fill bar. */
export function ProgressBar({ current, total, labels }: ProgressBarProps) {
  const pct = Math.round(((current - 1) / (total - 1)) * 100);

  return (
    <div className="w-full">
      <div
        className="relative"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`Step ${current} of ${total}`}
      >
        {/* Track */}
        <div className="absolute left-0 right-0 top-4 h-0.5 -translate-y-1/2 rounded-full bg-hairline dark:bg-dark-hairline" />
        {/* Fill */}
        <div
          className="absolute left-0 top-4 h-0.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
        {/* Step dots */}
        <ol className="relative flex items-start justify-between">
          {labels.map((label, i) => {
            const stepNum = i + 1;
            const done = stepNum < current;
            const active = stepNum === current;
            return (
              <li key={label} className="flex flex-1 flex-col items-center gap-2">
                <span
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-full border-2 text-xs font-bold transition-all duration-300',
                    done && 'border-primary bg-primary text-white',
                    active &&
                      'border-primary bg-white text-primary shadow-glow dark:bg-dark-surface',
                    !done && !active &&
                      'border-hairline bg-white text-muted dark:border-dark-hairline dark:bg-dark-surface',
                  )}
                >
                  {done ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </span>
                <span
                  className={cn(
                    'hidden text-center text-xs font-medium sm:block',
                    active ? 'text-ink dark:text-white' : 'text-muted',
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
