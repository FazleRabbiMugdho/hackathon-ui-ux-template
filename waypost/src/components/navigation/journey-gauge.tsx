'use client';

import { useState } from 'react';
import type { StopAnchor } from '@/hooks/useActiveStop';
import { needleAngleForStop } from '@/hooks/useJourneyEngine';
import { cn } from '@/lib/utils';

export interface JourneyGaugeProps {
  stops: StopAnchor[];
  activeIndex: number;
  onSelectStop?: (index: number) => void;
  className?: string;
}

function polarToCartesian(angleDeg: number, radius: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [100 + radius * Math.sin(rad), 100 - radius * Math.cos(rad)];
}

function describeArc(startDeg: number, endDeg: number, radius: number): string {
  const [x1, y1] = polarToCartesian(startDeg, radius);
  const [x2, y2] = polarToCartesian(endDeg, radius);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${radius} ${radius} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

/**
 * Reference-accurate circular speedometer / journey dial (`.sp`):
 * - Minor & major radial tick marks + crimson redline arc
 * - Clickable numbered stop markers along the 270deg dial
 * - Spring-physics needle (`#ws-sp-needle`), km readout (`#ws-sp-km`), and stop name (`#ws-sp-name`)
 * - Interactive hover/focus tooltip pill (`#ws-sp-tip`) + `.lo` fade over footer
 */
export function JourneyGauge({
  stops,
  activeIndex,
  onSelectStop,
  className,
}: JourneyGaugeProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (stops.length === 0) return null;

  const maxIdx = Math.max(1, stops.length - 1);
  const displayIdx = hoveredIdx ?? activeIndex;
  const displayStop = stops[displayIdx] ?? stops[0];
  const activeStop = stops[activeIndex] ?? stops[0];

  const tickCount = 24;
  const minorTicks = Array.from({ length: tickCount + 1 }, (_, i) => i).filter(
    (i) => i % 4 !== 0,
  );

  return (
    <aside
      aria-label="Journey progress"
      className={cn(
        'ws-sp fixed z-[44] right-2 bottom-3 w-[100px] h-[100px] md:top-1/2 md:bottom-auto md:right-1.5 md:-translate-y-1/2 md:w-[132px] md:h-[132px] lg:w-[144px] lg:h-[144px] transition-opacity duration-300 [&.lo]:opacity-0 [&.lo]:pointer-events-none',
        className,
      )}
    >
      <div
        id="ws-sp-tip"
        role="status"
        className={cn(
          'ws-font-mono pointer-events-none absolute right-0 bottom-[calc(100%+6px)] whitespace-nowrap rounded-full px-2.5 py-1.5 text-[0.7rem] font-bold text-[#fbf3e4] shadow-[0_0_0_2px_var(--ws-bg)] transition-colors md:bottom-auto md:top-1/2 md:right-[calc(100%+8px)] md:-translate-y-1/2 md:px-3.5 md:py-2 md:text-[0.8rem]',
          hoveredIdx !== null ? 'hv bg-[#1c1410]' : 'bg-[var(--ws-accent)]',
        )}
      >
        {String(displayStop.stopNumber).padStart(2, '0')} · {displayStop.label}
      </div>

      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        className="block drop-shadow-[0_10px_18px_rgba(28,20,16,0.34)]"
      >
        <circle cx="100" cy="100" r="98" fill="#1c1410" />
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#f3dcc0"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <path
          d={describeArc(-135, 135, 82)}
          fill="none"
          stroke="#fbf3e4"
          strokeOpacity="0.35"
          strokeWidth="3"
        />
        <path
          d={describeArc(94.5, 135, 82)}
          fill="none"
          stroke="#e24a4f"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {minorTicks.map((tick) => {
          const angle = -135 + (270 * tick) / tickCount;
          const [x1, y1] = polarToCartesian(angle, 76);
          const [x2, y2] = polarToCartesian(angle, 82);
          return (
            <line
              key={tick}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#fbf3e4"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
          );
        })}

        {stops.map((stop, idx) => {
          const angle = needleAngleForStop(idx, maxIdx);
          const [x1, y1] = polarToCartesian(angle, 70);
          const [x2, y2] = polarToCartesian(angle, 84);
          const [cx, cy] = polarToCartesian(angle, 60);
          const isCurrent = idx === activeIndex;

          return (
            <g key={stop.id}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbf3e4" strokeWidth="3" />
              <a
                href={`#${stop.id}`}
                aria-label={`${String(stop.stopNumber).padStart(2, '0')} ${stop.label}`}
                onClick={(e) => {
                  if (onSelectStop) {
                    e.preventDefault();
                    onSelectStop(idx);
                  }
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(idx)}
                onBlur={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r="10.5"
                  fill={isCurrent ? '#fbf3e4' : '#1c1410'}
                  stroke="#fbf3e4"
                  strokeOpacity={isCurrent ? 1 : 0.55}
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />
                <text
                  x={cx}
                  y={cy + 4.2}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="800"
                  fill={isCurrent ? '#1c1410' : '#fbf3e4'}
                  className="pointer-events-none select-none"
                >
                  {stop.stopNumber}
                </text>
              </a>
            </g>
          );
        })}

        <g
          id="ws-sp-needle"
          style={{ transformOrigin: '100px 100px', transform: 'rotate(-135deg)' }}
        >
          <path d="M100 100 L97 100 L100 24 L103 100Z" fill="#ff5560" />
        </g>
        <circle cx="100" cy="100" r="7" fill="#fbf3e4" stroke="var(--ws-accent)" strokeWidth="3" />
        <text
          id="ws-sp-km"
          x="100"
          y="128"
          textAnchor="middle"
          fontSize="20"
          fontWeight="800"
          fill="#fbf3e4"
        >
          0.0
        </text>
        <text
          x="100"
          y="140"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="#fbf3e4"
          opacity="0.8"
        >
          km
        </text>
        <text
          id="ws-sp-name"
          x="100"
          y="156"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#f3dcc0"
          className="hidden lg:block"
        >
          {activeStop.label}
        </text>
      </svg>
    </aside>
  );
}
