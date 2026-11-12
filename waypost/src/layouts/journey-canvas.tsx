import React from 'react';
import { cn } from '@/lib/utils';
import { TopDownRouteRider } from '@/components/visuals/waypost-illustrations';

export interface JourneyCanvasProps {
  children: React.ReactNode;
  showDecorations?: boolean;
  className?: string;
}

/**
 * Signature rounded-top blueprint grid surface (`border-radius: 44px 44px 0 0`)
 * housing the winding Bezier SVG route (`#ws-route`), draw-on-scroll crimson `#ws-trail`,
 * procedural scenery container (`#ws-scn`), and top-down cruising rider (`#ws-car`).
 */
export function JourneyCanvas({
  children,
  showDecorations = false,
  className,
}: JourneyCanvasProps) {
  return (
    <div
      id="ws-map"
      className={cn(
        'ws-blueprint-grid ws-map relative z-[2] -mt-[44px] rounded-t-[var(--ws-radius-canvas)] shadow-[var(--ws-shadow-canvas)]',
        className,
      )}
    >
      {/* Optional decorative district blocks */}
      {showDecorations && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[var(--ws-radius-canvas)]"
          aria-hidden="true"
        >
          <span className="hidden md:block absolute -left-10 top-[14%] h-44 w-44 rounded-[28px] border-2 border-[var(--ws-map-park-border)] bg-[var(--ws-map-park)] opacity-60" />
          <span className="hidden md:block absolute -right-12 top-[38%] h-52 w-48 rounded-[28px] border-2 border-[var(--ws-map-water-border)] bg-[var(--ws-map-water)] opacity-60" />
          <span className="hidden md:block absolute left-[6%] bottom-[22%] h-36 w-44 rounded-[28px] border-2 border-[var(--ws-map-park-border)] bg-[var(--ws-map-park)] opacity-50" />
        </div>
      )}

      {/* Dynamic Cubic Bezier SVG Highway + Progress Trail */}
      <svg
        id="ws-route"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-[1] overflow-visible"
      >
        <path
          className="ws-rd"
          fill="none"
          stroke="#3b2a22"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          className="ws-rd"
          fill="none"
          stroke="#5a4033"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          className="ws-rd"
          fill="none"
          stroke="#fbf3e4"
          strokeWidth="2.5"
          strokeDasharray="10 12"
          opacity="0.8"
        />
        <path
          id="ws-trail"
          fill="none"
          stroke="var(--ws-accent)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      {/* Procedural Pop-In Scenery Props */}
      <div id="ws-scn" aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]" />

      {/* Top-down Cruising Rider overlay */}
      <div
        id="ws-car"
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[45] -mt-[40px] -ml-[30px] opacity-0 will-change-[transform,opacity]"
      >
        <TopDownRouteRider />
      </div>

      {/* Stop Cards & Visual Tiles Container */}
      <div className="ws-map-in">
        {children}
      </div>
    </div>
  );
}
