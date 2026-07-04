import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from './cn';
import { controlClass } from './Field';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly string[];
  placeholder?: string;
}

/** Native select styled to match the design system, with a custom chevron. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, placeholder = 'Select…', className, value, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        value={value}
        className={cn(
          controlClass,
          'appearance-none pr-11 cursor-pointer',
          !value && 'text-muted/70',
          className,
        )}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-ink">
            {opt}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});
