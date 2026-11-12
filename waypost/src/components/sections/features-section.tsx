'use client';

import { motion } from 'framer-motion';
import type { FeaturesConfig } from '@/config/types';
import { Badge } from '@/components/ui/badge';
import { IconResolver } from '@/components/ui/icon-resolver';
import { SectionHeading } from '@/components/ui/section-heading';
import { ArchitectureMeshIllustration } from '@/components/visuals/waypost-illustrations';
import { SplitSection } from '@/layouts/split-section';

export interface FeaturesSectionProps {
  config: FeaturesConfig;
  active?: boolean;
}

/**
 * Stop 02 — Alternating right-side stop card (`stp.r`) with modular capability tiles
 * paired beside an illustrated corridor mesh scene on the left.
 */
export function FeaturesSection({ config, active = false }: FeaturesSectionProps) {
  return (
    <SplitSection
      id={config.id}
      stopNumber={config.stopNumber}
      active={active}
      layout="image-left"
      media={<ArchitectureMeshIllustration />}
      content={
        <>
          <SectionHeading
            eyebrow={config.eyebrow}
            title={config.title}
            lede={config.lede}
          />

          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {config.items.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col justify-between rounded-[var(--ws-radius-inner)] bg-[var(--ws-bg)] p-4 sm:p-5"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--ws-surface)] text-[var(--ws-accent)] shadow-xs transition-transform group-hover:scale-105">
                      <IconResolver name={item.icon} className="h-5 w-5" />
                    </span>
                    <Badge variant="mono">{item.tag}</Badge>
                  </div>

                  <h3 className="text-base sm:text-[1.05rem] font-black tracking-[-0.02em] text-[var(--ws-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--ws-ink-secondary)]">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </>
      }
    />
  );
}
