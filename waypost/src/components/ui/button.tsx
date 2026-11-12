'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none font-bold transition-[background-color,color,transform,box-shadow] duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-accent)] focus-visible:ring-offset-2 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--ws-accent)] text-[var(--ws-accent-contrast)] rounded-[var(--ws-radius-pill)] font-extrabold shadow-[var(--ws-shadow-btn)] hover:bg-[var(--ws-accent-hover)] hover:-translate-y-0.5 active:translate-y-0',
        outline:
          'border-2 border-[var(--ws-ink)] bg-[color-mix(in_srgb,var(--ws-surface)_85%,transparent)] text-[var(--ws-ink)] rounded-[var(--ws-radius-pill)] hover:bg-[var(--ws-ink)] hover:text-[var(--ws-bg)]',
        secondary:
          'bg-[var(--ws-surface-muted)] text-[var(--ws-ink)] border border-[var(--ws-border-subtle)] rounded-[var(--ws-radius-pill)] hover:bg-[var(--ws-hover-tint)]',
        ghost:
          'text-[var(--ws-ink)] rounded-full hover:bg-[var(--ws-hover-tint)]',
        link: 'text-[var(--ws-accent-text)] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'px-4 py-2.5 text-sm',
        default: 'px-[30px] py-[16px] text-base',
        lg: 'px-[30px] py-[16px] text-base font-extrabold',
        icon: 'h-10 w-10 rounded-full p-0',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        size: 'default',
        className: 'px-[28px] py-[14px]',
      },
      {
        variant: 'outline',
        size: 'lg',
        className: 'px-[28px] py-[14px] font-bold',
      },
      {
        variant: 'outline',
        size: 'sm',
        className: 'px-[14px] py-[8px]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };

