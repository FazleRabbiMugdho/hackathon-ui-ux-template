'use client';

import React, { useCallback } from 'react';
import type { SiteConfig } from '@/config/types';
import { useTheme } from '@/design-system/themeProvider';
import type { StopAnchor } from '@/hooks/useActiveStop';
import { useJourneyEngine } from '@/hooks/useJourneyEngine';
import { JourneyGauge } from '@/components/navigation/journey-gauge';
import { Navbar } from '@/components/navigation/navbar';
import { PreloaderCurtain } from '@/components/navigation/preloader-curtain';
import { Footer } from '@/components/sections/footer';

export interface PageShellProps {
  config: SiteConfig;
  stops: StopAnchor[];
  children: (props: {
    activeStopId: string;
    onNavigateHref: (href: string) => void;
  }) => React.ReactNode;
}

/**
 * Root application shell unifying PreloaderCurtain, SkipLink, Navbar,
 * live scroll/SVG JourneyEngine, floating JourneyGauge, main content, and Footer.
 */
export function PageShell({ config, stops, children }: PageShellProps) {
  const { presetId } = useTheme();
  const { rootRef, activeIndex, activeId, scrollToStop } = useJourneyEngine(stops, presetId);

  const handleNavigateHref = useCallback(
    (href: string) => {
      const targetId = href.replace(/^#/, '');
      const idx = stops.findIndex((s) => s.id === targetId);
      if (idx >= 0) {
        scrollToStop(idx);
        return;
      }
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    },
    [stops, scrollToStop],
  );

  return (
    <div ref={rootRef} className="relative min-h-screen flex flex-col">
      {config.enablePreloader && (
        <PreloaderCurtain enabled label={config.preloaderText} />
      )}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-[var(--ws-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[var(--ws-accent-contrast)]"
      >
        Skip to content
      </a>

      <Navbar
        projectName={config.projectName}
        navItems={config.navItems}
        activeId={activeId}
        showPresetSwitcher={config.showThemePresetSwitcher}
        onNavigateHref={handleNavigateHref}
      />

      {config.showJourneyGauge && (
        <JourneyGauge
          stops={stops}
          activeIndex={activeIndex}
          onSelectStop={scrollToStop}
        />
      )}

      <main id="main-content" className="flex-1">
        {children({ activeStopId: activeId, onNavigateHref: handleNavigateHref })}
      </main>

      <Footer config={config.footer} onNavigateHref={handleNavigateHref} />
    </div>
  );
}
