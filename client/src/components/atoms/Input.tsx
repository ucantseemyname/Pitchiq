import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from './cn';
import { controlClass } from './Field';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref,
) {
  return <input ref={ref} className={cn(controlClass, className)} {...rest} />;
});
