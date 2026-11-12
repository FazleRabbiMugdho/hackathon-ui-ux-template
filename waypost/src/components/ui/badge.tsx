import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center gap-1.5 transition-colors', {
  variants: {
    variant: {
      eyebrow: 'ws-font-script text-[1.1rem] leading-[1.2] text-[var(--ws-accent-text)]',
      mono: 'ws-font-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--ws-ink-secondary)]',
      pill: 'rounded-full border border-[var(--ws-border-subtle)] bg-[var(--ws-surface-muted)] px-3 py-1 text-xs font-bold text-[var(--ws-ink)]',
      positive: 'rounded-full bg-[var(--ws-positive-bg)] px-3 py-1 text-xs font-bold text-[var(--ws-positive)]',
      warning: 'rounded-full bg-[var(--ws-warning-bg)] px-3 py-1 text-xs font-bold text-[var(--ws-warning)]',
      danger: 'rounded-full bg-[var(--ws-danger-bg)] px-3 py-1 text-xs font-bold text-[var(--ws-danger)]',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

