import { cn } from '@/lib/utils';
import { Badge } from './badge';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/**
 * Editorial section header pairing a script eyebrow, tight-tracked bold display title,
 * and Fraunces serif lede paragraph.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  as: HeadingTag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center mx-auto max-w-3xl' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Badge variant="eyebrow" className="mb-[14px]">
          {eyebrow}
        </Badge>
      )}
      <HeadingTag className="text-balance text-[clamp(2rem,3.6vw,3.2rem)] font-black leading-[0.98] tracking-[-0.04em] text-[var(--ws-ink)]">
        {title}
      </HeadingTag>
      {lede && (
        <p className="ws-font-serif mt-4 max-w-2xl text-[1.15rem] sm:text-[1.25rem] leading-[1.4] text-[var(--ws-ink-secondary)]">
          {lede}
        </p>
      )}
    </div>
  );
}
