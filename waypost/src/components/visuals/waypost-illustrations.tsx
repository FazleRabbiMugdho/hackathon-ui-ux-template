import { cn } from '@/lib/utils';

/**
 * Signature geometric 3-wheeler / canopy emblem inspired directly by Tuktuk's `.tuk-ic`.
 * Uses `currentColor` so it adapts cleanly across Preloader, Navbar, and Hero H1.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 175"
      fill="currentColor"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path d="M50 20Q150 -16 254 18L264 62H44Z" />
      <path d="M34 66H262Q290 70 296 110L298 138H16L22 86Q25 70 34 66Z" />
      <circle cx="70" cy="146" r="28" />
      <circle cx="236" cy="146" r="28" />
    </svg>
  );
}

/**
 * Detailed animated Hero Vehicle (`#tt`) inspired by Tuktuk's side-profile centerpiece.
 * Spoked `.ws-wheel` groups rotate dynamically via `--wa` CSS custom property on scroll.
 */
export function HeroVehicle({
  badgeCode = 'WP 01',
  className,
}: {
  badgeCode?: string;
  className?: string;
}) {
  return (
    <svg
      id="ws-hero-vehicle"
      viewBox="0 0 300 200"
      aria-hidden="true"
      className={cn('block w-full overflow-visible', className)}
    >
      <defs>
        <linearGradient id="wsBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ws-accent)" />
          <stop offset="0.6" stopColor="var(--ws-accent)" />
          <stop offset="1" stopColor="var(--ws-accent-hover)" />
        </linearGradient>
        <linearGradient id="wsRoofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ws-surface)" />
          <stop offset="1" stopColor="var(--ws-surface-muted)" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="196" rx="150" ry="9" fill="var(--ws-ink)" opacity="0.28" />
      <path d="M50 40Q150 4 254 38L264 78H44Z" fill="url(#wsRoofGrad)" />
      <path d="M44 70H264L266 80H42Z" fill="var(--ws-accent)" />
      <path d="M216 42L258 78H208Z" fill="var(--ws-map-water)" opacity="0.9" />
      <path d="M60 40H212V78H56Z" fill="var(--ws-footer-bg)" />

      {/* Passenger & Driver silhouettes */}
      <path d="M86 80Q88 62 108 62Q128 62 130 80Z" fill="var(--ws-positive)" />
      <circle cx="108" cy="48" r="14" fill="#e0aa7e" />
      <path d="M94 44Q108 28 122 44Z" fill="var(--ws-ink)" />

      <path d="M164 80Q166 62 186 62Q206 62 208 80Z" fill="var(--ws-surface)" />
      <circle cx="186" cy="48" r="14" fill="#c98a5a" />
      <path d="M172 44Q186 26 200 44Z" fill="var(--ws-accent)" />
      <rect x="176" y="62" width="20" height="5" fill="var(--ws-accent)" />

      {/* Chassis */}
      <path
        d="M34 80H262Q290 84 296 124L298 152H16L22 100Q25 84 34 80Z"
        fill="url(#wsBodyGrad)"
      />
      <rect x="18" y="124" width="280" height="9" fill="var(--ws-surface)" opacity="0.92" />
      <path d="M36 84H258Q270 84 278 92H30Q32 86 36 84Z" fill="#ffffff" opacity="0.18" />
      <rect x="14" y="146" width="288" height="9" rx="4" fill="var(--ws-ink)" />

      {/* Headlight */}
      <circle cx="288" cy="108" r="9" fill="#fff6c2" />
      <circle cx="288" cy="108" r="15" fill="#fff6c2" opacity="0.28" />

      {/* Canopy ribs & frame */}
      <path
        d="M52 40Q150 6 252 38"
        fill="none"
        stroke="var(--ws-accent)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M70 36V70M112 28V70M154 26V70"
        stroke="var(--ws-surface-muted)"
        strokeWidth="2"
        opacity="0.7"
      />
      <rect x="56" y="38" width="156" height="6" fill="var(--ws-accent)" opacity="0.85" />
      <path d="M212 38L260 78" stroke="var(--ws-ink)" strokeWidth="3" />
      <path d="M258 82L276 60" stroke="var(--ws-ink)" strokeWidth="3" strokeLinecap="round" />
      <circle
        cx="277"
        cy="58"
        r="5"
        fill="var(--ws-map-water)"
        stroke="var(--ws-ink)"
        strokeWidth="2"
      />
      <rect x="132" y="94" width="30" height="5" rx="2.5" fill="var(--ws-surface)" opacity="0.9" />
      <rect x="168" y="94" width="30" height="5" rx="2.5" fill="var(--ws-surface)" opacity="0.9" />

      {/* Number plate */}
      <rect
        x="34"
        y="136"
        width="46"
        height="14"
        rx="3"
        fill="var(--ws-surface)"
        stroke="var(--ws-ink)"
        strokeWidth="1.5"
      />
      <text
        x="57"
        y="147"
        fontSize="9"
        fontWeight="800"
        textAnchor="middle"
        fill="var(--ws-ink)"
      >
        {badgeCode}
      </text>

      <path
        d="M16 118Q4 120 4 132"
        fill="none"
        stroke="var(--ws-accent-hover)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M32 150Q20 154 14 148"
        fill="none"
        stroke="#4a4a4a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M32 136A40 40 0 0 1 108 136" fill="var(--ws-accent-hover)" />
      <path d="M200 136A40 40 0 0 1 272 136" fill="var(--ws-accent-hover)" />

      {/* Animated spoked wheels */}
      {[70, 236].map((cx) => (
        <g key={cx} className="ws-wheel">
          <circle cx={cx} cy="162" r="30" fill="#1c1410" />
          <circle cx={cx} cy="162" r="14" fill="#fbf3e4" />
          <circle cx={cx} cy="162" r="23" fill="none" stroke="#3a2a22" strokeWidth="3" />
          <path
            d={`M${cx} 148V176M${cx - 14} 162H${cx + 14}M${cx - 10} 152L${cx + 10} 172M${cx + 10} 152L${cx - 10} 172`}
            stroke="#1c1410"
            strokeWidth="3"
          />
          <circle cx={cx} cy="162" r="4" fill="var(--ws-accent)" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Top-down cruising vehicle (`#car` / `#carg`) that glides from the Hero into the winding SVG route.
 */
export function TopDownRouteRider() {
  return (
    <svg viewBox="-30 -40 60 80" width="60" height="80" className="block overflow-visible">
      <g id="ws-route-rider-g">
        <ellipse cx="2" cy="4" rx="17" ry="26" fill="#1c1410" opacity="0.22" />
        <circle cx="0" cy="-26" r="4.2" fill="#1c1410" />
        <rect x="-18" y="8" width="7" height="14" rx="3" fill="#1c1410" />
        <rect x="11" y="8" width="7" height="14" rx="3" fill="#1c1410" />
        <path
          d="M-13 -24Q0 -33 13 -24L16 20Q0 27 -16 20Z"
          fill="var(--ws-accent)"
          stroke="#1c1410"
          strokeWidth="2"
        />
        <path d="M-11 -4Q0 -9 11 -4L12 16Q0 21 -12 16Z" fill="#fbf3e4" />
        <path d="M-9 -20Q0 -25 9 -20L10 -9Q0 -12 -10 -9Z" fill="#8fc3dc" opacity="0.9" />
        <circle cx="-5" cy="-27" r="1.8" fill="#fff6c2" />
        <circle cx="5" cy="-27" r="1.8" fill="#fff6c2" />
      </g>
    </svg>
  );
}

/**
 * Original editorial SVG scene: neighborhood solar shelter & corridor canopies.
 */
export function CorridorHubIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 380"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn('scene h-[112%] w-full block absolute -top-[6%] left-0', className)}
    >
      <rect width="520" height="380" fill="var(--ws-sky-bottom)" />
      <circle cx="420" cy="82" r="34" fill="var(--ws-sun)" stroke="var(--ws-ink-secondary)" strokeWidth="2" />
      <path d="M0 292 Q130 245 260 282 T520 272 V380 H0 Z" fill="var(--ws-map-park)" />
      <rect y="318" width="520" height="14" fill="var(--ws-map-park-border)" />

      <path d="M56 54 Q260 102 464 54" fill="none" stroke="var(--ws-ink-secondary)" strokeWidth="2" />
      {[110, 175, 240, 305, 370, 420].map((x, idx) => (
        <circle
          key={x}
          cx={x}
          cy={68 + Math.sin(idx * 0.7) * 10}
          r="6"
          fill={idx % 2 === 0 ? 'var(--ws-accent)' : 'var(--ws-positive)'}
        />
      ))}

      {[84, 212, 340].map((x, idx) => (
        <g key={x}>
          <rect x={x + 8} y="166" width="5" height="134" fill="var(--ws-ink-secondary)" />
          <rect x={x + 92} y="166" width="5" height="134" fill="var(--ws-ink-secondary)" />
          <rect
            x={x}
            y="142"
            width="106"
            height="32"
            rx="8"
            fill="var(--ws-accent)"
            stroke="var(--ws-ink)"
            strokeWidth="2.5"
          />
          <line x1={x + 35} y1="142" x2={x + 35} y2="174" stroke="var(--ws-accent-contrast)" strokeOpacity="0.45" strokeWidth="2" />
          <line x1={x + 70} y1="142" x2={x + 70} y2="174" stroke="var(--ws-accent-contrast)" strokeOpacity="0.45" strokeWidth="2" />
          <rect
            x={x + 12}
            y="248"
            width="82"
            height="52"
            rx="10"
            fill="var(--ws-surface)"
            stroke="var(--ws-ink-secondary)"
            strokeWidth="2.5"
          />
          <rect x={x + 24} y="264" width="58" height="8" rx="4" fill="var(--ws-positive)" />
          <g className="ws-float" style={{ animationDelay: `${idx * 0.55}s` }}>
            <circle
              cx={x + 53}
              cy="206"
              r="11"
              fill="var(--ws-surface)"
              stroke="var(--ws-accent)"
              strokeWidth="2.5"
            />
            <circle cx={x + 53} cy="206" r="4" fill="var(--ws-accent)" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/**
 * Original editorial SVG scene: pulsed street beacon & transit stop sign.
 */
export function WayfinderPinIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 380"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn('scene h-[112%] w-full block absolute -top-[6%] left-0', className)}
    >
      <rect width="520" height="380" fill="var(--ws-map-water)" />
      <rect x="28" y="155" width="70" height="125" rx="8" fill="var(--ws-surface)" fillOpacity="0.45" />
      <rect x="404" y="128" width="84" height="152" rx="8" fill="var(--ws-surface)" fillOpacity="0.45" />
      <rect y="274" width="520" height="16" fill="var(--ws-surface-muted)" />
      <rect y="290" width="520" height="90" fill="var(--ws-road)" />
      <rect y="334" width="520" height="4" fill="var(--ws-accent-contrast)" fillOpacity="0.65" />

      <rect x="342" y="106" width="10" height="168" fill="var(--ws-ink)" />
      <rect
        x="298"
        y="78"
        width="98"
        height="46"
        rx="12"
        fill="var(--ws-surface)"
        stroke="var(--ws-accent)"
        strokeWidth="3.5"
      />
      <text
        x="347"
        y="107"
        textAnchor="middle"
        fontSize="16"
        fontWeight="900"
        fill="var(--ws-accent-text)"
        fontFamily="var(--ws-font-mono)"
      >
        STOP
      </text>

      <ellipse
        className="ws-ripple"
        cx="210"
        cy="314"
        rx="34"
        ry="10"
        fill="none"
        stroke="var(--ws-accent)"
        strokeWidth="3"
      />
      <ellipse
        className="ws-ripple ws-ripple-delay"
        cx="210"
        cy="314"
        rx="34"
        ry="10"
        fill="none"
        stroke="var(--ws-accent)"
        strokeWidth="3"
      />

      <g className="ws-float">
        <path
          d="M210 306C188 274 178 260 178 240a32 32 0 0 1 64 0c0 20-10 34-32 66z"
          fill="var(--ws-accent)"
          stroke="var(--ws-surface)"
          strokeWidth="3.5"
        />
        <circle cx="210" cy="240" r="11" fill="var(--ws-surface)" />
      </g>
    </svg>
  );
}

/**
 * Compact decorative milestone tile for CTA flank.
 */
export function MilestoneFlagTile({
  badgeText,
  variant = 'rank',
  className,
}: {
  badgeText: string;
  variant?: 'rank' | 'launch';
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 520 380"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn('scene h-[112%] w-full block absolute -top-[6%] left-0', className)}
    >
      <rect
        width="520"
        height="380"
        fill={variant === 'rank' ? 'var(--ws-map-park)' : 'var(--ws-sky-bottom)'}
        fillOpacity="0.6"
      />
      <rect y="308" width="520" height="72" fill="var(--ws-map-park)" />
      <rect y="320" width="520" height="10" fill="var(--ws-map-park-border)" />

      {variant === 'rank' ? (
        <g>
          <rect x="257" y="28" width="6" height="280" fill="var(--ws-ink-secondary)" />
          <rect
            x="196"
            y="18"
            width="128"
            height="40"
            rx="12"
            fill="var(--ws-surface)"
            stroke="var(--ws-accent)"
            strokeWidth="3"
          />
          <text
            x="260"
            y="43"
            textAnchor="middle"
            fontSize="16"
            fontWeight="900"
            fill="var(--ws-accent-text)"
            fontFamily="var(--ws-font-mono)"
          >
            {badgeText}
          </text>
          {[92, 168, 244].map((y, idx) => (
            <g key={y} className="ws-float" style={{ animationDelay: `${idx * 0.65}s` }}>
              <rect
                x="184"
                y={y}
                width="152"
                height="48"
                rx="14"
                fill="var(--ws-surface)"
                stroke="var(--ws-ink-secondary)"
                strokeWidth="2.5"
              />
              <circle cx="212" cy={y + 24} r="8" fill="var(--ws-accent)" />
              <rect x="232" y={y + 18} width="80" height="12" rx="6" fill="var(--ws-surface-muted)" />
            </g>
          ))}
        </g>
      ) : (
        <g>
          <rect x="136" y="106" width="12" height="206" fill="var(--ws-ink-secondary)" />
          <rect x="372" y="106" width="12" height="206" fill="var(--ws-ink-secondary)" />
          <rect
            x="116"
            y="84"
            width="288"
            height="54"
            rx="14"
            fill="var(--ws-accent)"
            stroke="var(--ws-ink)"
            strokeWidth="3"
          />
          <rect x="176" y="96" width="168" height="30" rx="9" fill="var(--ws-surface)" />
          <text
            x="260"
            y="116"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="var(--ws-ink)"
            fontFamily="var(--ws-font-mono)"
          >
            {badgeText}
          </text>
          <path
            d="M150 310 H370 L398 380 H122 Z"
            fill="var(--ws-road)"
          />
          <line
            x1="260"
            y1="318"
            x2="260"
            y2="374"
            stroke="#fbf3e4"
            strokeWidth="4"
            strokeDasharray="10 10"
          />
          <g className="ws-float">
            <circle cx="142" cy="56" r="12" fill="var(--ws-accent)" />
            <circle cx="378" cy="56" r="12" fill="var(--ws-positive)" />
          </g>
        </g>
      )}
    </svg>
  );
}

/**
 * Stop 02 editorial SVG scene: Solar corridor mesh towers & synchronized signal wave.
 */
export function ArchitectureMeshIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-gradient-to-b from-[#dcebd0] via-[#dcebd0] to-[var(--ws-map-park)]',
        className,
      )}
    >
      <svg
        viewBox="0 0 520 420"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="scene h-full w-full block"
      >
        <path d="M0 320 Q130 285 260 315 T520 300 V420 H0 Z" fill="var(--ws-map-park)" />
        <rect y="346" width="520" height="74" fill="var(--ws-map-park-border)" />

      {/* Overhead mesh link arc */}
      <path
        d="M125 148 Q260 66 395 148"
        fill="none"
        stroke="var(--ws-accent)"
        strokeWidth="3.5"
        strokeDasharray="10 8"
      />

      {/* Left solar beacon relay */}
      <rect x="118" y="148" width="14" height="186" fill="var(--ws-ink)" />
      <rect
        x="86"
        y="124"
        width="78"
        height="34"
        rx="10"
        fill="var(--ws-surface)"
        stroke="var(--ws-ink-secondary)"
        strokeWidth="3"
      />
      <rect x="98" y="135" width="54" height="12" rx="6" fill="var(--ws-positive)" />

      {/* Center solar canopy node */}
      <rect x="252" y="108" width="16" height="228" fill="var(--ws-ink)" />
      <rect
        x="198"
        y="86"
        width="124"
        height="40"
        rx="12"
        fill="var(--ws-accent)"
        stroke="var(--ws-ink)"
        strokeWidth="3"
      />
      <text
        x="260"
        y="112"
        textAnchor="middle"
        fontSize="15"
        fontWeight="900"
        fill="var(--ws-accent-contrast)"
        fontFamily="var(--ws-font-mono)"
      >
        MESH SYNC
      </text>

      {/* Right beacon */}
      <rect x="388" y="148" width="14" height="186" fill="var(--ws-ink)" />
      <rect
        x="356"
        y="124"
        width="78"
        height="34"
        rx="10"
        fill="var(--ws-surface)"
        stroke="var(--ws-ink-secondary)"
        strokeWidth="3"
      />
      <rect x="368" y="135" width="54" height="12" rx="6" fill="var(--ws-accent)" />

      {/* Floating data packets */}
      <g className="ws-float" style={{ animationDelay: '0s' }}>
        <rect
          x="160"
          y="206"
          width="88"
          height="52"
          rx="14"
          fill="var(--ws-surface)"
          stroke="var(--ws-ink-secondary)"
          strokeWidth="2.5"
        />
        <circle cx="182" cy="232" r="8" fill="var(--ws-positive)" />
        <rect x="198" y="226" width="36" height="10" rx="5" fill="var(--ws-surface-muted)" />
      </g>
      <g className="ws-float" style={{ animationDelay: '0.8s' }}>
        <rect
          x="276"
          y="236"
          width="96"
          height="52"
          rx="14"
          fill="var(--ws-surface)"
          stroke="var(--ws-accent)"
          strokeWidth="2.5"
        />
        <circle cx="300" cy="262" r="8" fill="var(--ws-accent)" />
        <rect x="316" y="256" width="42" height="10" rx="5" fill="var(--ws-surface-muted)" />
      </g>
      </svg>
    </div>
  );
}

/**
 * Stop 03 editorial SVG scene: Solar battery reserve bars & street telemetry pulse.
 */
export function TelemetryPulseIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn('scene h-[112%] w-full block absolute -top-[6%] left-0', className)}
    >
      <rect width="520" height="420" fill="#f8e3bf" />
      <rect y="334" width="520" height="86" fill="var(--ws-map-park)" />
      <rect y="348" width="520" height="10" fill="var(--ws-map-park-border)" />

      {/* Chart card frame */}
      <rect
        x="68"
        y="62"
        width="384"
        height="244"
        rx="28"
        fill="var(--ws-surface)"
        stroke="var(--ws-ink-secondary)"
        strokeWidth="3"
      />
      <rect x="104" y="96" width="128" height="12" rx="6" fill="var(--ws-ink-secondary)" opacity="0.25" />

      {/* Metric bar columns */}
      {[
        { x: 112, h: 92, color: 'var(--ws-map-water-border)' },
        { x: 176, h: 128, color: 'var(--ws-positive)' },
        { x: 240, h: 108, color: 'var(--ws-map-water-border)' },
        { x: 304, h: 152, color: 'var(--ws-accent)' },
        { x: 368, h: 140, color: 'var(--ws-positive)' },
      ].map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={272 - bar.h}
          width="38"
          height={bar.h}
          rx="10"
          fill={bar.color}
        />
      ))}

      <g className="ws-float">
        <rect
          x="320"
          y="40"
          width="116"
          height="42"
          rx="21"
          fill="var(--ws-ink)"
        />
        <text
          x="378"
          y="66"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#fbf3e4"
          fontFamily="var(--ws-font-mono)"
        >
          +99.4% UP
        </text>
      </g>
    </svg>
  );
}

/**
 * Stop 04 tall vertical status rail tile next to the operator dashboard card.
 */
export function CorridorStatusRailIllustration({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-[#cfe5f0]', className)}>
      <svg
        viewBox="0 0 360 760"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="scene h-full w-full block"
      >
        <line x1="180" y1="36" x2="180" y2="724" stroke="var(--ws-ink)" strokeWidth="6" strokeDasharray="10 10" />
        {[120, 290, 460, 630].map((y, idx) => (
          <g key={y} className="ws-float" style={{ animationDelay: `${idx * 0.4}s` }}>
            <rect
              x="44"
              y={y - 36}
              width="272"
              height="72"
              rx="20"
              fill="var(--ws-surface)"
              stroke="var(--ws-ink-secondary)"
              strokeWidth="2.5"
            />
            <circle
              cx="82"
              cy={y}
              r="11"
              fill={idx === 1 ? 'var(--ws-accent)' : 'var(--ws-positive)'}
            />
            <rect x="110" y={y - 11} width="160" height="10" rx="5" fill="var(--ws-ink)" opacity="0.75" />
            <rect x="110" y={y + 6} width="110" height="8" rx="4" fill="var(--ws-ink-secondary)" opacity="0.35" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * Stop 05 reference-accurate speech bubbles tile (`.tile.t-fb`) for Testimonials / Field Notes.
 */
export function FeedbackBubblesTile({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-[#f7d6d0]', className)}>
      <svg
        viewBox="0 0 300 420"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="scene h-full w-full block"
      >
        <g className="ws-float" style={{ animationDelay: '0s' }}>
          <rect
            x="50"
            y="36"
            width="170"
            height="96"
            rx="26"
            fill="#fbf3e4"
            stroke="#4a2f22"
            strokeWidth="2.5"
          />
          <path
            d="M78 130l-10 22 28 -20z"
            fill="#fbf3e4"
            stroke="#4a2f22"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect x="56" y="126" width="44" height="8" fill="#fbf3e4" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={76 + i * 28} cy="67" r="9" fill="#e9b44c" />
          ))}
          <rect x="66" y="92" width="130" height="8" rx="4" fill="#4a2f22" opacity="0.35" />
          <rect x="66" y="108" width="90" height="8" rx="4" fill="#4a2f22" opacity="0.35" />
        </g>

      <g className="ws-float" style={{ animationDelay: '0.8s' }}>
        <rect
          x="80"
          y="178"
          width="170"
          height="92"
          rx="26"
          fill="var(--ws-accent)"
          stroke="#4a2f22"
          strokeWidth="2.5"
        />
        <path
          d="M108 268l-10 22 28 -20z"
          fill="var(--ws-accent)"
          stroke="#4a2f22"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x="86" y="264" width="44" height="8" fill="var(--ws-accent)" />
        <path
          d="M165 234s-16-10.4-16-22a9 9 0 0 1 16-5.6A9 9 0 0 1 181 212c0 11.6-16 22-16 22z"
          fill="#fbf3e4"
        />
        <rect x="104" y="248" width="120" height="7" rx="3.5" fill="#fbf3e4" opacity="0.6" />
      </g>

      <g className="ws-float" style={{ animationDelay: '1.5s' }}>
        <rect
          x="50"
          y="312"
          width="160"
          height="74"
          rx="26"
          fill="#cfe5f0"
          stroke="#4a2f22"
          strokeWidth="2.5"
        />
        <path
          d="M78 384l-10 22 28 -20z"
          fill="#cfe5f0"
          stroke="#4a2f22"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x="56" y="380" width="44" height="8" fill="#cfe5f0" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={88 + i * 36} cy="342" r="10" fill="var(--ws-accent)" />
        ))}
        <rect x="70" y="366" width="100" height="7" rx="3.5" fill="#4a2f22" opacity="0.35" />
      </g>
      </svg>
    </div>
  );
}
