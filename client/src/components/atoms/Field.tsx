import type { ReactNode } from 'react';
import { cn } from './cn';

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
  required?: boolean;
  className?: string;
}

/** Accessible label + hint wrapper shared by all form controls. */
export function Field({
  label,
  htmlFor,
  children,
  hint,
  required,
  className,
}: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-ink dark:text-white"
      >
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

/** Shared visual styling for input-like controls. */
export const controlClass =
  'w-full rounded-xl border border-hairline bg-white px-4 py-3 text-[15px] text-ink ' +
  'placeholder:text-muted/60 shadow-soft transition-colors ' +
  'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 ' +
  'dark:bg-dark-surface dark:text-white dark:border-dark-hairline';
