'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-sm font-bold tracking-[-0.01em] text-[var(--ws-ink)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

const inputBaseClass =
  'w-full rounded-[var(--ws-radius-input)] border-2 border-[var(--ws-ink-secondary)] bg-[var(--ws-bg)] px-5 py-3.5 text-base font-semibold text-[var(--ws-ink)] placeholder:text-[var(--ws-ink-secondary)] placeholder:opacity-75 transition-colors focus-visible:outline-none focus-visible:border-[var(--ws-accent)] focus-visible:ring-2 focus-visible:ring-[var(--ws-accent-ring)] disabled:cursor-not-allowed disabled:opacity-60';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={hasError || undefined}
      className={cn(
        inputBaseClass,
        hasError && 'border-[var(--ws-danger)] focus-visible:border-[var(--ws-danger)]',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={hasError || undefined}
      className={cn(
        inputBaseClass,
        'min-h-[120px] resize-y',
        hasError && 'border-[var(--ws-danger)] focus-visible:border-[var(--ws-danger)]',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError, children, ...props }, ref) => (
    <select
      ref={ref}
      aria-invalid={hasError || undefined}
      className={cn(
        inputBaseClass,
        'cursor-pointer appearance-none',
        hasError && 'border-[var(--ws-danger)] focus-visible:border-[var(--ws-danger)]',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = 'Select';

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  error,
  helperText,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="ml-1 text-[var(--ws-accent-text)]" aria-hidden="true">
            *
          </span>
        )}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm font-semibold text-[var(--ws-danger)]">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-[var(--ws-ink-secondary)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export { Label, Input, Textarea, Select };

