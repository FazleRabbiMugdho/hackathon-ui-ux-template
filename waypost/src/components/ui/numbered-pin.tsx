'use client';

import { cn } from '@/lib/utils';

export interface NumberedPinProps {
  number: number | string;
  active?: boolean;
  position?: 'inline' | 'edge-right' | 'edge-left' | 'top-center';
  className?: string;
  label?: string;
}

/**
 * Circular milestone stop indicator inspired by Tuktuk's `.pin`.
 * Positioned directly via `.ws-pin` rules in `globals.css` at exact `760px` / `761px+`
 * breakpoints to stay locked to the highway Bezier spine across desktop and mobile.
 */
export function NumberedPin({
  number,
  active = false,
  position = 'inline',
  className,
  label,
}: NumberedPinProps) {
  const isInline = position === 'inline';

  return (
    <span
      data-pin="true"
      data-pin-pos={isInline ? undefined : position}
      aria-label={label ?? `Stop ${number}`}
      className={cn(
        'z-[3] grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] border-[var(--ws-accent)] text-[0.95rem] font-black transition-[background-color,transform] duration-300',
        isInline ? 'relative' : 'ws-pin',
        active
          ? 'on ws-pin-pop bg-[var(--ws-accent)] text-[var(--ws-accent-contrast)]'
          : 'bg-[var(--ws-surface)] text-[var(--ws-accent-text)] [&.on]:bg-[var(--ws-accent)] [&.on]:text-[var(--ws-accent-contrast)]',
        className,
      )}
    >
      {number}
    </span>
  );
}
