'use client';

import type { CtaConfig } from '@/config/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MilestoneFlagTile } from '@/components/visuals/waypost-illustrations';
import { SplitSection } from '@/layouts/split-section';

export interface CtaSectionProps {
  config: CtaConfig;
  active?: boolean;
  onNavigateHref?: (href: string) => void;
}

/**
 * Stop 06 — Alternating right-side call-to-action (`ws-stp-r`) paired with the
 * scenic milestone launch gate tile on the left so the center road stays clear.
 */
export function CtaSection({ config, active = false, onNavigateHref }: CtaSectionProps) {
  const handleLink = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateHref && href.startsWith('#')) {
      e.preventDefault();
      onNavigateHref(href);
    }
  };

  return (
    <SplitSection
      id={config.id}
      stopNumber={config.stopNumber}
      active={active}
      layout="image-left"
      media={<MilestoneFlagTile badgeText="LAUNCH" variant="launch" />}
      content={
        <div className="flex flex-col items-start justify-center text-left">
          <Badge variant="eyebrow" className="mb-[14px]">
            {config.eyebrow}
          </Badge>
          <h2 className="text-balance text-[clamp(2rem,3.6vw,3.2rem)] font-black leading-[0.98] tracking-[-0.04em] text-[var(--ws-ink)]">
            {config.title}
          </h2>
          <p className="ws-font-serif mt-3 mb-4 text-[clamp(1.8rem,3.4vw,2.8rem)] italic leading-none text-[var(--ws-accent-text)]">
            {config.emphasisLine}
          </p>
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--ws-ink-secondary)]">
            {config.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href={config.primaryCta.href} onClick={handleLink(config.primaryCta.href)}>
                {config.primaryCta.label}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={config.secondaryCta.href} onClick={handleLink(config.secondaryCta.href)}>
                {config.secondaryCta.label}
              </a>
            </Button>
          </div>
        </div>
      }
    />
  );
}
