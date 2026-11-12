'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { NumberedPin } from '@/components/ui/numbered-pin';

export interface SplitSectionProps {
  id: string;
  stopNumber?: number;
  active?: boolean;
  layout?: 'image-right' | 'image-left';
  ratio?: '50-50' | '60-40' | 'wide-content';
  content: React.ReactNode;
  media: React.ReactNode;
  className?: string;
}

/**
 * Reference-accurate alternating 2-column stop section (`.stp.l` / `.stp.r`):
 * - Uses exact `760px` / `761px-1023px` / `1024px+` grid rules from `globals.css`
 * - Card + spine-edge NumberedPin (`data-card`, `data-pin`)
 * - Illustrated visual tile (`data-tile`, `data-tile-for`) with parallax `.scene`
 */
export function SplitSection({
  id,
  stopNumber,
  active = false,
  layout = 'image-right',
  ratio = '50-50',
  content,
  media,
  className,
}: SplitSectionProps) {
  const isImageLeft = layout === 'image-left';
  const tileFor = stopNumber !== undefined ? Math.max(0, stopNumber - 1) : 0;

  return (
    <section
      id={id}
      className={cn(
        'ws-stp scroll-mt-24',
        isImageLeft ? 'ws-stp-r' : 'ws-stp-l',
        ratio === 'wide-content' && isImageLeft && 'ws-stp-wide-r',
        className,
      )}
    >
      <div className="ws-stp-card">
        <Card
          variant={active ? 'lit' : 'default'}
          side={isImageLeft ? 'right' : 'left'}
          className="h-full"
        >
          {stopNumber !== undefined && (
            <NumberedPin
              number={stopNumber}
              active={active}
              position={isImageLeft ? 'edge-left' : 'edge-right'}
            />
          )}
          {content}
        </Card>
      </div>

      <div
        data-tile="true"
        data-tile-for={tileFor}
        aria-hidden="true"
        className={cn(
          'ws-stp-tile ws-stop-tile relative min-h-[340px] overflow-hidden rounded-[var(--ws-radius-card)] border-2 border-[var(--ws-ink-secondary)] bg-[var(--ws-surface-muted)] [&.lit]:opacity-100 [&.lit]:scale-100',
          active && 'lit',
        )}
      >
        {media}
      </div>
    </section>
  );
}
