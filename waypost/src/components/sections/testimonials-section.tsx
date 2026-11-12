'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { TestimonialsConfig } from '@/config/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { FeedbackBubblesTile } from '@/components/visuals/waypost-illustrations';
import { SplitSection } from '@/layouts/split-section';

export interface TestimonialsSectionProps {
  config: TestimonialsConfig;
  active?: boolean;
}

/**
 * Stop 05 — Direct structural match to Tuktuk's `#feedback` `.stp.l` section:
 * Left card houses stacked dashed `.rec` field receipts while the right `.tile`
 * frames floating speech bubbles.
 */
export function TestimonialsSection({ config, active = false }: TestimonialsSectionProps) {
  return (
    <SplitSection
      id={config.id}
      stopNumber={config.stopNumber}
      active={active}
      layout="image-right"
      media={<FeedbackBubblesTile />}
      content={
        <>
          <SectionHeading
            eyebrow={config.eyebrow}
            title={config.title}
            lede={config.lede}
          />

          <div className="mt-[22px] grid gap-[18px]">
            {config.items.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="flex flex-col justify-between rounded-[24px] border-2 border-dashed border-[var(--ws-border-dashed)] bg-[var(--ws-bg)] px-6 py-[22px]"
              >
                <div>
                  <div className="ws-font-mono flex items-center justify-between gap-2 text-[0.78rem] uppercase tracking-[0.08em] text-[var(--ws-ink-secondary)]">
                    <span>{item.role}</span>
                    <span>{item.receiptCode}</span>
                  </div>

                  <h3 className="mt-2.5 text-[1.45rem] font-black tracking-[-0.03em] text-[var(--ws-ink)]">
                    {item.author}
                  </h3>

                  <div
                    className="my-2 flex flex-wrap items-center gap-3 text-sm font-bold"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    <span className="flex items-center gap-0.5 text-[var(--ws-positive)]" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="h-4 w-4"
                          fill={starIdx < item.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </span>
                    <span className="text-[var(--ws-ink-secondary)]">{item.rating}/5</span>
                  </div>

                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--ws-ink)]">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 border-t-2 border-dashed border-[var(--ws-border-dashed)] pt-3 text-sm font-extrabold text-[var(--ws-ink-secondary)]">
                  <span>{item.metaLeft}</span>
                  <span className="text-[var(--ws-ink)]">{item.metaRight}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </>
      }
    />
  );
}
