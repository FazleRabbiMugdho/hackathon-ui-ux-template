# Design System Specification (`Waypost` / Tuktuk-Inspired)

## 1. Design Philosophy

This design system translates the warm editorial journey language of the Tuktuk reference into a domain-agnostic foundation for modern web products:

- **Warm Paper over Sterile White**: Surfaces rely on tinted warm neutrals (`--ws-bg`, `--ws-surface`) paired with rich ink (`--ws-ink`) rather than flat `#ffffff`/`#000000` contrast.
- **Journey-Driven Structure**: Pages unfold as numbered stops (`Stop 00` → `Stop 07`) over a subtle `56px` blueprint grid (`JourneyCanvas`), connected by circular milestone pins (`NumberedPin`) and tracked by a floating `JourneyGauge`.
- **Expressive Typography Hierarchy**: Four complementary font voices separate human storytelling (`Fraunces` + `Pacifico`), structural authority (`Inter` ExtraBold/Black), and operational precision (`DM Mono`).
- **Tactile Borders & Radii**: Generous radii (`22px`–`44px`), crisp `2px` borders, and dashed receipt cards replace heavy drop shadows.

---

## 2. Color Tokens

Defined in `src/design-system/tokens.css` and typed in `src/design-system/tokens.ts`. Every token adapts automatically between `.dark` and light mode, and is dynamically updated by `ThemeProvider` when switching presets (`src/design-system/themes.ts`).

### Default Preset (`waypost-warm`)
| CSS Variable | Light | Dark | Usage |
|---|---|---|---|
| `--ws-bg` | `#fbf3e4` | `#17110e` | Page background, blueprint canvas, input fill |
| `--ws-surface` | `#fffdf8` | `#241a15` | Elevated section cards & dropdowns |
| `--ws-surface-muted` | `#f5ead6` | `#2e211b` | Secondary pills, table tags, skeleton bars |
| `--ws-ink` | `#1c1410` | `#f6ecdc` | Headings, primary copy, outline button border |
| `--ws-ink-secondary` | `#4a2f22` | `#e8d3bb` | Supporting body text, card borders, ledes |
| `--ws-accent` | `#b3202e` | `#c42a3a` | Primary CTAs, active pins, active nav bar |
| `--ws-accent-hover` | `#8f1824` | `#a21f2d` | Primary button hover state |
| `--ws-accent-text` | `#b3202e` | `#ff7b86` | Eyebrows, links, high-contrast accent copy |
| `--ws-positive` | `#3f6f2e` | `#9bd47f` | Healthy status badges, rating stars, receipts |
| `--ws-warning` | `#c87a19` | `#f4b254` | Caution status indicators |
| `--ws-danger` | `#b3202e` | `#ff7b86` | Form validation alerts & error states |
| `--ws-footer-bg` | `#2a1a12` | `#120c09` | Rounded-top footer backdrop |

### Built-In Hackathon Presets
- `waypost-warm`: Warm cream & crimson (default editorial / civic / mobility).
- `civic-emerald`: Oat & forest green (Climate, Agriculture, BioTech).
- `clinical-teal`: Alabaster & clinical teal (Healthcare, Diagnostics).
- `neural-indigo`: Cool parchment & indigo (AI/ML, DevTools, SaaS).

---

## 3. Typography

Loaded via `next/font/google` in `src/app/layout.tsx`:

| Role | Font Family | Weights | Tracking / Leading |
|---|---|---|---|
| Display Hero (`h1`) | `Inter` (`--font-sans`) | `900` | `-0.05em` / `0.85` |
| Section Heading (`h2`) | `Inter` (`--font-sans`) | `900` | `-0.04em` / `1.0` |
| Card Heading (`h3`) | `Inter` (`--font-sans`) | `900` | `-0.03em` / `1.15` |
| Editorial Lede / Tagline | `Fraunces` (`--font-serif`) | `400–600` (italic for taglines) | `0` / `1.08–1.45` |
| Stop Eyebrow | `Pacifico` (`--font-script`) | `400` | `0` / `1.2` |
| Metadata / Receipt / Gauge | `DM Mono` (`--font-mono`) | `400–500` | `+0.08em` uppercase |

---

## 4. Spacing, Radii & Elevation

- **Container Max Width**: `--ws-container-max: 80rem` (`1280px`).
- **Canvas Overlap**: `JourneyCanvas` and `Footer` apply `-mt-[44px]` with `--ws-radius-canvas: 44px` top corners for seamless stacked surfaces.
- **Border Radii**:
  - Canvas / Footer Top: `44px` (`--ws-radius-canvas`)
  - Cards & Visual Tiles: `30px` (`--ws-radius-card`)
  - Primary / Outline Pill Buttons: `28px` (`--ws-radius-pill`)
  - Inputs & Receipt Cards: `22px` (`--ws-radius-input`)
  - Inner Info Blocks & KPI Cards: `20px` (`--ws-radius-inner`)
- **Shadows**:
  - Resting card: `0 14px 30px -24px rgba(28, 20, 16, 0.85)`
  - Active stop (`variant="lit"`): `0 0 0 4px var(--ws-accent-ring), 0 26px 40px -26px rgba(28, 20, 16, 0.9)`

---

## 5. Layout Patterns

1. **Full-Width Story Hero** (`HeroSection variant="story"`): Sticky `300svh` scroll stage with sky gradient, arcing sun, masked skyline parallax layers, scrolling road lane, left scrim, and concentric handoff from `HeroVehicle` into the route rider.
2. **Split-Screen Hero** (`HeroSection variant="split"`): Asymmetric 2-column content + framed visual preview.
3. **Alternating Split Stops (`01..07`)** (`SplitSection`): Strictly alternates `image-right` (Stop 01, 03, 05, Contact Stop 07) and `image-left` (Stop 02, Console Stop 04, Launch CTA Stop 06) so the continuous SVG highway passes uninterrupted down the open center corridor.
4. **Card Grids**: Feature cards (2/3-column), Stats KPI cards (2/4-column), Receipt testimonial cards (3-column / vertical stack).
5. **Dashboard Shell** (`DashboardLayout`): Toolbar + KPI strip + main/aside workspace (with `stackAside` option inside Stop 04 split layout).

---

## 6. Responsive Rules

- **Desktop (`>= 1024px`)**: Full horizontal nav, symmetric 3-column corridor (`minmax(0, 1fr) clamp(110px, 12vw, 190px) minmax(0, 1fr)`), circular `144px` JourneyGauge, `±20px` pin overhang along inner card corners.
- **Tablet (`761px–1023px`)**: Mobile drawer trigger replaces desktop nav links; `132px` JourneyGauge; symmetric `minmax(0, 1fr) clamp(84px, 10vw, 120px) minmax(0, 1fr)` split grid with compact outer padding (`clamp(16px, 4vw, 44px)`) so the center highway stays aligned across all alternating stops.
- **Mobile (`<= 760px`)**: Single-column stack with left highway rail (`padding: 0 18px 0 62px`), pins aligned along `left: -41px`, decorative split tiles hidden so cards stay scannable, compact `100px` bottom-right JourneyGauge, `overflow-x: clip` enforced globally.

---

## 7. Animation Guidelines

- **Curves**: Smooth deceleration `--ws-ease-out: cubic-bezier(0.16, 1, 0.3, 1)`, playful pin spring `--ws-ease-pop: cubic-bezier(0.3, 1.8, 0.5, 1)`, drawer slide `--ws-ease-drawer: cubic-bezier(0.76, 0, 0.24, 1)`.
- **Scroll-Driven Journey Engine (`src/hooks/useJourneyEngine.ts`)**:
  - **Optional Preloader Curtain (`PreloaderCurtain`)**: Controlled by `siteConfig.enablePreloader` (disabled `false` by default for instant first paint; set `true` to enable the crimson splash curtain with bobbing `BrandMark` and `0→100` counter).
  - **Sticky `300svh` Hero Stage (`HeroSection`)**: Interpolates sky/horizon colors across 3 keyframes, arcs `#ws-sun`, drives 4 masked SVG skyline/foliage parallax layers, scrolls the road lane, and spins/shrinks `HeroVehicle` concentrically (`50% 72%`) before handing off to `#ws-car`.
  - **Bezier Corridor Route (`JourneyCanvas`)**: Connects `[data-pin]` coordinates via smooth cubic Bezier `#ws-route` SVG path sweeping across the open central corridor, draws progressive crimson `#ws-trail`, steers `TopDownRouteRider` along path tangents, pops in deterministic scenery props (`#ws-scn`), and applies `.lit`/`.on` stop states alongside parallax `.scene` illustration tiles.
  - **Spring Speedometer (`JourneyGauge`)**: Uses a semi-implicit spring (`stiffness = 120`, `damping = 9.5`) for the needle angle, displays dynamic speed/progress (`km`) and active stop readout, reveals `#ws-sp-tip` `.hv` preview tooltips on dot hover/focus, and supports direct stop jumping.
- **Global Guardrail**: `Providers` wraps the tree in `<MotionConfig reducedMotion="user">`, `globals.css` disables `.ws-float`, `.ws-ripple`, `.ws-wheel`, `.ws-scenery-prop`, and hero letter/preloader animations under `@media (prefers-reduced-motion: reduce)`, and the rAF engine respects reduced motion and `jsdom`.

