'use client';

import { useMemo } from 'react';
import { siteConfig } from '@/config/site.config';
import type { StopAnchor } from '@/hooks/useActiveStop';
import { JourneyCanvas } from '@/layouts/journey-canvas';
import { PageShell } from '@/layouts/page-shell';
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ShowcaseSection } from '@/components/sections/showcase-section';
import { StatsSection } from '@/components/sections/stats-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';

/**
 * Main demonstration landing page composing all 10 design system sections
 * wired to the continuous journey route engine and centralized `site.config.ts`.
 */
export function HomePage() {
  const stops = useMemo<StopAnchor[]>(
    () => [
      { id: 'home', label: 'Start', stopNumber: 0 },
      { id: siteConfig.about.id, label: 'Mission', stopNumber: siteConfig.about.stopNumber },
      { id: siteConfig.features.id, label: 'System', stopNumber: siteConfig.features.stopNumber },
      { id: siteConfig.stats.id, label: 'Impact', stopNumber: siteConfig.stats.stopNumber },
      { id: siteConfig.showcase.id, label: 'Console', stopNumber: siteConfig.showcase.stopNumber },
      {
        id: siteConfig.testimonials.id,
        label: 'Field Notes',
        stopNumber: siteConfig.testimonials.stopNumber,
      },
      { id: siteConfig.cta.id, label: 'Departure', stopNumber: siteConfig.cta.stopNumber },
      { id: siteConfig.contact.id, label: 'Dispatch', stopNumber: siteConfig.contact.stopNumber },
    ],
    [],
  );

  return (
    <PageShell config={siteConfig} stops={stops}>
      {({ onNavigateHref }) => (
        <>
          <HeroSection config={siteConfig.hero} onNavigateHref={onNavigateHref} />

          <JourneyCanvas>
            <AboutSection
              config={siteConfig.about}
              onNavigateHref={onNavigateHref}
            />
            <FeaturesSection config={siteConfig.features} />
            <StatsSection config={siteConfig.stats} />
            <ShowcaseSection config={siteConfig.showcase} />
            <TestimonialsSection config={siteConfig.testimonials} />
            <CtaSection config={siteConfig.cta} onNavigateHref={onNavigateHref} />
            <ContactSection config={siteConfig.contact} />
          </JourneyCanvas>
        </>
      )}
    </PageShell>
  );
}
