'use client';

import { motion } from 'framer-motion';
import type { StatsConfig } from '@/config/types';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/ui/section-heading';
import { TelemetryPulseIllustration } from '@/components/visuals/waypost-illustrations';
import { SplitSection } from '@/layouts/split-section';

export interface StatsSectionProps {
  config: StatsConfig;
  active?: boolean;
}

/**
 * Stop 03 — Alternating left-side impact KPI card (`stp.l`) with dashed editorial cells
 * paired beside an illustrated telemetry pulse tile on the right.
 */
export function StatsSection({ config, active = false }: StatsSectionProps) {
  return (
    <SplitSection
      id={config.id}
      stopNumber={config.stopNumber}
      active={active}
      layout="image-right"
      media={<TelemetryPulseIllustration />}
      content={
        <>
          <SectionHeading
            eyebrow={config.eyebrow}
            title={config.title}
            lede={config.lede}
          />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {config.items.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="flex flex-col justify-between rounded-[var(--ws-radius-input)] border-2 border-dashed border-[var(--ws-border-dashed)] bg-[var(--ws-bg)] p-5"
              >
                <div>
                  {stat.delta && (
                    <Badge variant="positive" className="mb-3">
                      {stat.delta}
                    </Badge>
                  )}
                  <p className="text-[clamp(2.1rem,3.6vw,2.9rem)] font-black leading-none tracking-[-0.04em] text-[var(--ws-ink)]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-base font-extrabold text-[var(--ws-ink)]">{stat.label}</p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[var(--ws-ink-secondary)]">
                  {stat.context}
                </p>
              </motion.div>
            ))}
          </div>
        </>
      }
    />
  );
}
