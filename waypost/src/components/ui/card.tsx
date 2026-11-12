import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'ws-stop-card relative',
  {
    variants: {
      variant: {
        default:
          'rounded-[var(--ws-radius-card)] border-2 border-[var(--ws-ink-secondary)] bg-[var(--ws-surface)] shadow-[var(--ws-shadow-card)]',
        lit:
          'lit rounded-[var(--ws-radius-card)] border-2 border-[var(--ws-accent)] bg-[var(--ws-surface)] shadow-[var(--ws-shadow-card-lit)]',
        dashed:
          'rounded-[var(--ws-radius-input)] border-2 border-dashed border-[var(--ws-border-dashed)] bg-[var(--ws-bg)]',
        muted:
          'rounded-[var(--ws-radius-inner)] bg-[var(--ws-bg)] border border-[var(--ws-border-subtle)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4 sm:p-5',
        md: 'p-6 sm:p-7',
        lg: 'p-6 md:p-[clamp(26px,3vw,40px)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'lg',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  isStopCard?: boolean;
  side?: 'left' | 'right';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, isStopCard = true, side, ...props }, ref) => (
    <div
      ref={ref}
      data-card={isStopCard ? 'true' : undefined}
      data-side={side}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-xl sm:text-2xl font-black tracking-[-0.03em] text-[var(--ws-ink)]',
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm sm:text-base leading-relaxed text-[var(--ws-ink-secondary)]', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('pt-4', className)} {...props} />,
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-5', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
