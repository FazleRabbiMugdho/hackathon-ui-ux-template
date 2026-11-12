'use client';

import type { HeroConfig } from '@/config/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BrandMark,
  CorridorHubIllustration,
  HeroVehicle,
} from '@/components/visuals/waypost-illustrations';

function buildSkylineMask(seedInit: number, minH: number, maxH: number, count: number): string {
  let seed = seedInit;
  const rand = () => {
    seed = (16807 * seed) % 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const step = 1600 / count;
  let rects = '';
  for (let i = 0; i < count; i++) {
    const h = minH + rand() * (maxH - minH);
    rects += `<rect x="${i * step}" y="${400 - h}" width="${step * (0.62 + 0.3 * rand())}" height="${h}"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" preserveAspectRatio="none">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const HILL_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" preserveAspectRatio="none"><path d="M0 400V250Q200 120 420 230T820 200T1220 220T1600 250V400Z"/></svg>',
)}")`;

const HERO_LAYERS = [
  { className: 'h-[52%] bottom-[19%]', varName: 'var(--hill, var(--ws-horizon-hill))', mask: HILL_MASK },
  { className: 'h-[44%] bottom-[19%]', varName: 'var(--far, var(--ws-horizon-far))', mask: buildSkylineMask(7, 110, 300, 16) },
  { className: 'h-[36%] bottom-[19%]', varName: 'var(--mid, var(--ws-horizon-mid))', mask: buildSkylineMask(23, 80, 230, 13) },
  { className: 'h-[26%] bottom-[19%]', varName: 'var(--near, var(--ws-horizon-near))', mask: buildSkylineMask(41, 55, 170, 10) },
];

export interface HeroSectionProps {
  config: HeroConfig;
  variant?: 'story' | 'split';
  onNavigateHref?: (href: string) => void;
}

/**
 * Reference-accurate Hero Section:
 * - `story`: 300svh scroll stage with sticky 100svh horizon, arcing sun, 4 SVG-masked parallax
 *   skyline layers, animated spinning-wheel HeroVehicle, and staggered per-letter rising headline.
 * - `split`: Balanced 2-column product hero for SaaS/AI/Dashboard hackathons.
 */
export function HeroSection({ config, variant, onNavigateHref }: HeroSectionProps) {
  const activeVariant = variant ?? config.variant;

  const handleCtaClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateHref && href.startsWith('#')) {
      e.preventDefault();
      onNavigateHref(href);
    }
  };

  if (activeVariant === 'split') {
    return (
      <section
        id="home"
        className="relative overflow-hidden bg-[linear-gradient(180deg,var(--ws-sky-top)_0%,var(--ws-sky-bottom)_65%,var(--ws-bg)_100%)] pt-28 pb-28 sm:pt-36 sm:pb-36"
      >
        <div className="mx-auto grid max-w-[var(--ws-container-max)] grid-cols-1 items-center gap-10 px-4 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-12">
          <div>
            <Badge variant="eyebrow" className="mb-4">
              {config.stopLabel}
            </Badge>
            <h1
              aria-label={config.headline}
              className="flex flex-wrap items-center text-[clamp(3.4rem,9vw,6.8rem)] font-black leading-[0.86] tracking-[-0.05em] text-[var(--ws-ink)]"
            >
              {config.headline.split('').map((char, idx) => (
                <span key={idx} className="ws-letter-mask" aria-hidden="true">
                  <i style={{ '--d': `${70 * idx}ms` } as React.CSSProperties}>
                    {char === ' ' ? '\u00A0' : char}
                  </i>
                </span>
              ))}
              <BrandMark className="ml-[0.14em] w-[0.55em] text-[var(--ws-accent)]" />
            </h1>
            <p className="ws-font-serif ws-hero-slogan mt-5 text-[clamp(1.4rem,2.6vw,2.1rem)] italic leading-[1.15] text-[var(--ws-ink-secondary)]">
              {config.tagline}
            </p>
            <p className="ws-hero-desc mt-5 max-w-xl text-base sm:text-lg font-semibold leading-relaxed text-[var(--ws-ink)]">
              {config.description}
            </p>
            <div className="ws-hero-actions mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={config.primaryCta.href} onClick={handleCtaClick(config.primaryCta.href)}>
                  {config.primaryCta.label}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={config.secondaryCta.href} onClick={handleCtaClick(config.secondaryCta.href)}>
                  {config.secondaryCta.label}
                </a>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden rounded-[var(--ws-radius-card)] border-2 border-[var(--ws-ink-secondary)] bg-[var(--ws-surface)] shadow-[var(--ws-shadow-card)]">
            <CorridorHubIllustration />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-[300svh]">
      <div
        id="ws-stage"
        className="sticky top-0 h-[100svh] overflow-hidden text-[var(--ws-ink)]"
        style={{
          perspective: '1000px',
          background: 'linear-gradient(var(--top, var(--ws-sky-top)), var(--bot, var(--ws-sky-bottom)))',
        }}
      >
        {/* Arcing Glowing Sun */}
        <div
          id="ws-sun"
          aria-hidden="true"
          className="pointer-events-none absolute -top-[50px] -left-[50px] h-[100px] w-[100px] rounded-full will-change-transform"
          style={{
            background: 'var(--sunc, var(--ws-sun))',
            boxShadow: '0 0 90px 40px var(--sunc, var(--ws-sun))',
          }}
        />

        {/* 4 SVG-masked Parallax Horizon Layers */}
        {HERO_LAYERS.map((layer, idx) => (
          <div
            key={idx}
            aria-hidden="true"
            className={`ws-lay pointer-events-none absolute inset-x-0 ${layer.className}`}
            style={{
              background: layer.varName,
              WebkitMaskImage: layer.mask,
              maskImage: layer.mask,
              WebkitMaskPosition: '0 100%',
              maskPosition: '0 100%',
              WebkitMaskSize: '1600px 100%',
              maskSize: '1600px 100%',
              WebkitMaskRepeat: 'repeat-x',
              maskRepeat: 'repeat-x',
            }}
          />
        ))}

        {/* Ground Road & Scrolling Lane Dashes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[21%] border-t-[6px] border-[var(--ws-road-border)] bg-[var(--ws-road)]"
        >
          <div
            id="ws-lane"
            className="absolute inset-x-0 top-[46%] h-[6px]"
            style={{
              background:
                'repeating-linear-gradient(90deg, var(--ws-accent-contrast) 0 56px, transparent 56px 112px)',
            }}
          />
        </div>

        {/* Animated Hero Vehicle Centerpiece */}
        <div id="ws-ttw" className="ws-ttw">
          <HeroVehicle badgeCode="WP 01" className="[transform-origin:50%_90%] will-change-transform" />
        </div>

        {/* Directional Scrim & Staggered Hero Typography */}
        <div
          id="ws-hero-content"
          className="pointer-events-none absolute inset-0 flex flex-col items-start justify-start pt-[clamp(86px,13vh,138px)] pb-10 px-[clamp(20px,6vw,90px)] will-change-[opacity]"
          style={{
            background:
              'linear-gradient(90deg, var(--ws-hero-scrim) 0, color-mix(in srgb, var(--ws-hero-scrim) 72%, transparent) 50%, transparent 80%)',
          }}
        >
          <Badge variant="eyebrow" className="mb-[14px] text-[1.15rem]">
            {config.stopLabel}
          </Badge>

          <h1
            aria-label={config.headline}
            className="flex max-w-full items-center text-[clamp(3.1rem,13.5vw,10.5rem)] md:text-[clamp(3.8rem,12.8vw,11.5rem)] font-black leading-[0.82] tracking-[-0.05em] text-[var(--ws-ink)]"
          >
            {config.headline.split('').map((char, idx) => (
              <span key={idx} className="ws-letter-mask" aria-hidden="true">
                <i style={{ '--d': `${70 * idx}ms` } as React.CSSProperties}>
                  {char === ' ' ? '\u00A0' : char}
                </i>
              </span>
            ))}
            <BrandMark className="ml-[0.14em] w-[0.5em] text-[var(--ws-accent)]" />
          </h1>

          <p className="ws-font-serif ws-hero-slogan mt-[clamp(14px,2.5vh,28px)] text-[clamp(1.65rem,3.6vw,3.1rem)] italic leading-[1.05] text-[var(--ws-ink-secondary)]">
            {config.tagline}
          </p>

          <p className="ws-hero-desc my-[clamp(14px,2.2vh,24px)] max-w-[38ch] text-[clamp(1.05rem,1.65vw,1.35rem)] font-semibold leading-snug text-[var(--ws-ink)]">
            {config.description}
          </p>

          <div className="ws-hero-actions pointer-events-auto flex flex-wrap items-center gap-3.5">
            <Button asChild size="lg">
              <a href={config.primaryCta.href} onClick={handleCtaClick(config.primaryCta.href)}>
                {config.primaryCta.label}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={config.secondaryCta.href} onClick={handleCtaClick(config.secondaryCta.href)}>
                {config.secondaryCta.label}
              </a>
            </Button>
          </div>

          <p className="mt-[clamp(14px,2vh,26px)] text-[0.85rem] font-bold uppercase tracking-[0.14em] text-[var(--ws-ink-secondary)]">
            {config.scrollHint}
          </p>
        </div>
      </div>
    </section>
  );
}
