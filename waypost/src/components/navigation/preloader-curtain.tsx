'use client';

import { useEffect, useRef, useState } from 'react';
import { BrandMark } from '@/components/visuals/waypost-illustrations';

export interface PreloaderCurtainProps {
  enabled?: boolean;
  label?: string;
}

/**
 * Reference-accurate crimson curtain preloader (`#ld`):
 * - Bobbing BrandMark silhouette (`0.5s` ease-in-out alternate)
 * - Cubic-eased 0 -> 100 counter + horizontal progress bar
 * - Slide-up curtain reveal (`1s cubic-bezier(.76,0,.24,1)`)
 */
export function PreloaderCurtain({
  enabled = true,
  label = 'Starting the engine',
}: PreloaderCurtainProps) {
  const [visible, setVisible] = useState(enabled);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const isTestEnv = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);

    if (isTestEnv) {
      setVisible(false);
      return;
    }

    document.body.classList.add('ws-scroll-locked');

    let active = true;
    const start = performance.now();
    const duration = reducedMotion ? 200 : 1500;
    let rafId = 0;

    if (countRef.current) countRef.current.textContent = '0';
    if (barRef.current) barRef.current.style.transform = 'scaleX(0)';

    const tick = (now: number) => {
      if (!active) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(100 * eased));
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${eased})`;
      }
      if (t < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          document.body.classList.remove('ws-scroll-locked');
        }, 250);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    // Safety fallback in case CSS animationend does not fire
    const fallbackTimer = window.setTimeout(() => {
      document.body.classList.remove('ws-scroll-locked');
      setVisible(false);
    }, reducedMotion ? 500 : 2900);

    return () => {
      active = false;
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(fallbackTimer);
      document.body.classList.remove('ws-scroll-locked');
    };
  }, [enabled]);

  if (!visible) return null;

  return (
    <div
      id="ws-preloader"
      aria-hidden="true"
      onAnimationEnd={() => {
        document.body.classList.remove('ws-scroll-locked');
        setVisible(false);
      }}
      className="ws-preloader fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--ws-accent)] p-6 text-[var(--ws-accent-contrast)]"
    >
      <p className="text-[1.4rem] font-semibold tracking-[-0.02em]">{label}</p>

      <div className="self-center">
        <BrandMark className="ws-preloader-bob w-[clamp(120px,22vw,220px)] text-[var(--ws-accent-contrast)]" />
      </div>

      <div>
        <div
          ref={countRef}
          className="text-[clamp(5rem,20vw,16rem)] font-black leading-[0.8] tracking-[-0.05em] tabular-nums"
        >
          100
        </div>
        <div className="mt-[18px] h-[5px] overflow-hidden rounded-[9px] bg-[color-mix(in_srgb,var(--ws-accent-contrast)_28%,transparent)]">
          <div
            ref={barRef}
            className="h-full origin-left bg-[var(--ws-accent-contrast)]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}

