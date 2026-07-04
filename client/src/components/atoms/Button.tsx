import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'ghost' | 'dark' | 'subtle';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-canvas dark:focus-visible:ring-offset-dark-canvas ' +
  'disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-glow hover:bg-primary-hover hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-ink border border-hairline hover:border-ink/40 hover:bg-white/60 ' +
    'dark:text-white dark:border-dark-hairline dark:hover:bg-white/[0.06]',
  dark: 'bg-ink text-white hover:bg-ink/90 hover:-translate-y-0.5 dark:bg-white dark:text-ink',
  subtle:
    'bg-white text-ink border border-hairline shadow-soft hover:shadow-card ' +
    'dark:bg-dark-surface dark:text-white dark:border-dark-hairline',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-[15px] px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    iconLeft,
    iconRight,
    fullWidth,
    className,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        iconLeft
      )}
      {children}
      {!loading && iconRight}
    </button>
  );
});
