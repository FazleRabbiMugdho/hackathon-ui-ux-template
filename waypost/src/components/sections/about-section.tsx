'use client';

import type { AboutConfig } from '@/config/types';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { CorridorHubIllustration } from '@/components/visuals/waypost-illustrations';
import { SplitSection } from '@/layouts/split-section';

export interface AboutSectionProps {
  config: AboutConfig;
  active?: boolean;
  onNavigateHref?: (href: string) => void;
}

/**
 * Stop 01 — Alternating editorial intro card + illustrated scene tile.
 */
export function AboutSection({
  config,
  active = false,
  onNavigateHref,
}: AboutSectionProps) {
  return (
    <SplitSection
      id={config.id}
      stopNumber={config.stopNumber}
      active={active}
      layout={config.visualLayout}
      content={
        <div className="flex h-full flex-col justify-between">
          <div>
            <SectionHeading
              eyebrow={config.eyebrow}
              title={config.title}
              lede={config.lede}
            />

            <ul className="mt-6 grid gap-3">
              {config.points.map((point) => (
                <li
                  key={point.title}
                  className="rounded-[var(--ws-radius-inner)] bg-[var(--ws-bg)] px-5 py-4 text-[var(--ws-ink)]"
                >
                  <strong className="mb-0.5 block text-base font-extrabold tracking-[-0.01em]">
                    {point.title}
                  </strong>
                  <span className="text-sm leading-relaxed text-[var(--ws-ink-secondary)]">
                    {point.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex">
            <Button asChild size="lg">
              <a
                href={config.cta.href}
                onClick={(e) => {
                  if (onNavigateHref && config.cta.href.startsWith('#')) {
                    e.preventDefault();
                    onNavigateHref(config.cta.href);
                  }
                }}
              >
                {config.cta.label}
              </a>
            </Button>
          </div>
        </div>
      }
      media={<CorridorHubIllustration />}
    />
  );
}
