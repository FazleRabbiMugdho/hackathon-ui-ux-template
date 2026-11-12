'use client';

import { useEffect, useState } from 'react';

export interface StopAnchor {
  id: string;
  label: string;
  stopNumber: number;
}

export interface ActiveStopState {
  activeIndex: number;
  activeId: string;
  progress: number;
}

/**
 * Tracks active journey stop section and overall scroll progress (0..1)
 * using IntersectionObserver + throttled scroll fallback.
 */
export function useActiveStop(stops: StopAnchor[]): ActiveStopState {
  const [state, setState] = useState<ActiveStopState>({
    activeIndex: 0,
    activeId: stops[0]?.id ?? 'home',
    progress: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || stops.length === 0) return;

    let rafId = 0;

    const computeProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = Math.min(1, Math.max(0, scrollTop / docHeight));

      const viewportFocus = scrollTop + window.innerHeight * 0.36;
      let bestIndex = 0;

      stops.forEach((stop, index) => {
        const el = document.getElementById(stop.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + scrollTop;
        if (viewportFocus >= top) {
          bestIndex = index;
        }
      });

      setState((prev) => {
        const nextId = stops[bestIndex]?.id ?? prev.activeId;
        if (
          prev.activeIndex === bestIndex &&
          prev.activeId === nextId &&
          Math.abs(prev.progress - progress) < 0.004
        ) {
          return prev;
        }
        return {
          activeIndex: bestIndex,
          activeId: nextId,
          progress,
        };
      });
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        computeProgress();
      });
    };

    computeProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [stops]);

  return state;
}

