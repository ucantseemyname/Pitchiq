import { Check } from '../atoms/icons';
import { cn } from '../atoms/cn';

export interface StepMeta {
  title: string;
  description: string;
}

interface FormStepperProps {
  steps: StepMeta[];
  /** 1-based current step. */
  current: number;
}

/**
 * Vertical stepper for the split-screen form. Shows each step's title and
 * description with a connecting rail; completed steps get a check, the active
 * step is accented in red, upcoming steps are muted.
 */
export function FormStepper({ steps, current }: FormStepperProps) {
  return (
    <ol className="relative flex flex-col gap-2">
      {steps.map((step, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        const last = i === steps.length - 1;

        return (
          <li key={step.title} className="relative flex gap-4 pb-2">
            {/* Rail */}
            {!last && (
              <span
                className={cn(
                  'absolute left-[15px] top-9 h-[calc(100%-1.5rem)] w-px',
                  done ? 'bg-primary' : 'bg-white/15',
                )}
              />
            )}

            {/* Marker */}
            <span
              className={cn(
                'relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-all duration-300',
                done && 'border-primary bg-primary text-white',
                active && 'border-primary bg-primary/15 text-white shadow-glow',
                !done && !active && 'border-white/20 bg-transparent text-white/40',
              )}
            >
              {done ? <Check width={15} height={15} /> : n}
            </span>

            {/* Label */}
            <div className="pt-0.5">
              <div
                className={cn(
                  'text-[15px] font-semibold transition-colors',
                  active ? 'text-white' : done ? 'text-white/80' : 'text-white/40',
                )}
              >
                {step.title}
              </div>
              <div
                className={cn(
                  'mt-0.5 text-xs transition-colors',
                  active ? 'text-white/60' : 'text-white/30',
                )}
              >
                {step.description}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
