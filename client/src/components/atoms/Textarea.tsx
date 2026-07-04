import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from './cn';
import { controlClass } from './Field';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows = 4, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(controlClass, 'resize-y leading-relaxed', className)}
        {...rest}
      />
    );
  },
);
