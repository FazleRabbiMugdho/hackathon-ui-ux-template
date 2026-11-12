# Reference Analysis: Tuktuk (`https://tuktuk-your-stop.foundingdev.com/`)

## 1. Inspection Methodology & Limitations

### What Was Inspected
- **Live SSR HTML DOM & Production Stylesheets/Scripts**: Inspected `https://tuktuk-your-stop.foundingdev.com/` SSR markup, compiled CSS chunks, and client route/animation JavaScript behavior.
- **Live Headless Chromium Visual Rendering (`1440×900`, `900×1024`, `390×844`)**: Captured side-by-side desktop and responsive screenshots of the live reference site (`hero` shrink/crossfade progression, road curve geometry around cards and pins, speedometer dial, and mobile layout) alongside our local Waypost build.

### Scope Boundaries
- Interactive inspection used automated headless Chromium scripts and Chrome DevTools Protocol rather than authenticated/manual click sessions across third-party external embeds. Design principles are translated into an independent implementation under the **Waypost** brand without redistributing reference code or branded artwork.

---

## 2. Core Visual Identity & Design Personality

The reference site avoids cold, sterile corporate SaaS aesthetics in favor of a **warm, tactile, editorial-meets-illustrated-map** visual language:
1. **Paper & Espresso Ink**: Instead of `#ffffff` and `#000000`, it uses warm cream paper (`#fbf3e4` / `#fffdf8`) paired with roasted cocoa (`#4a2f22`) and deep espresso (`#1c1410`), anchored by a bold crimson accent (`#b3202e`).
2. **Journey-Based Storytelling ("Stops")**: Content is framed as sequential destinations along a continuous route (`Stop 00 · The departure` → `Stop 01 · About Us` → `Stop 02 · Find Us` → `Stop 03 · Feedback` → `Stop 04 · Book A T-Ride`), connected by a map grid, numbered circular pins, and a floating circular journey/speedometer gauge.
3. **Tactile Geometry**: Generous rounded corners (`20px–44px`), crisp `2px` borders, dashed receipt-style testimonial cards, and overlapping rounded canvas transitions (`border-radius: 44px 44px 0 0` with `margin-top: -44px`).

---

## 3. Observed Token System

### A. Color Palette (Light & Dark)
| Semantic Role | Light Mode Token & Value | Dark Mode Token & Value |
|---|---|---|
| Canvas / Background | `--cream: #fbf3e4` | `--cream: #17110e` |
| Elevated Card Surface | `--paper: #fffdf8` | `--paper: #241a15` |
| Primary Text Ink | `--ink: #1c1410` | `--ink: #f6ecdc` |
| Secondary Warm Text / Border | `--brown: #4a2f22` | `--brown: #e8d3bb` |
| Primary Brand Action | `--crimson: #b3202e` (`-d: #8f1824`) | `--crimson: #c42a3a` (`-d: #a21f2d`) |
| Accent / Eyebrow Text | `--crt: #b3202e` | `--crt: #ff7b86` |
| Positive / Rating Star | `--star: #3f6f2e`, `--green: #5f8a4b` | `--star: #9bd47f` |
| Map Water / Park Accents | `--water: #a9d0e2`, `--park: #a9c98f` | `--water: #27475a`, `--park: #2e4a2a` |
| Blueprint Grid & Dashed Lines | `--grid: #4a2f2214`, `--line: #4a2f2255` | `--grid: #f6ecdc14`, `--line: #f6ecdc55` |
| Footer Surface | `#2a1a12` with `#fbf3e4` text | Inherited dark espresso contrast |

### B. Typography System
The reference pairs **four distinct typographic voices**, each with a strict role:
1. **Display & UI Sans (`Inter`)**:
   - `h1`: `clamp(4.4rem, 16vw, 14rem)`, `font-weight: 900`, `letter-spacing: -0.05em`, `line-height: 0.82`.
   - `h2`: `clamp(2rem, 3.6vw, 3.2rem)`, `font-weight: 900`, `letter-spacing: -0.04em`, `line-height: 0.98`, `text-wrap: balance`.
   - `h3`: `1.6rem`, `font-weight: 900`, `letter-spacing: -0.03em`.
   - Nav & Buttons: `font-weight: 700–800`.
2. **Editorial Serif (`Fraunces`)**:
   - Used for hero slogan (`clamp(1.7rem, 3.8vw, 3.2rem)`, italic, `line-height: 1.05`), section ledes (`1.25rem`, `line-height: 1.4`), CTA emphasis (`clamp(1.8rem, 3.4vw, 2.8rem)`, italic), and form status feedback.
3. **Human Script Accent (`Pacifico`)**:
   - Used exclusively for small stop eyebrows (`Stop 00 · The departure`, `1.1–1.15rem`), injecting warmth and personality without sacrificing body legibility.
4. **Technical Monospace (`DM Mono`)**:
   - Used for receipt metadata, role tags (`0.78rem`, uppercase, `letter-spacing: 0.08em`), and journey gauge tooltip pills (`0.8rem`).

### C. Spacing, Radii & Shadows
- **Section Transitions**: `#map` and `#footer` overlap upward (`margin-top: -44px`) with `border-radius: 44px 44px 0 0`.
- **Card / Tile Radii**: `30px` outer cards and visual tiles; `28px` pill buttons; `24px` inputs and receipt cards; `20px` inner bullet/hours boxes; `99px` tabs, toggles, and nav pills.
- **Map Grid Background**: `56px × 56px` repeating `1px` grid (`--grid`).
- **Elevation**: Subtle warm shadow (`0 14px 30px -24px #1c1410`), transitioning on active/lit stop to a crisp focus halo (`0 0 0 4px #b3202e33, 0 26px 40px -26px #1c1410`) and crimson border (`--crimson`).

---

## 4. Layout, Navigation & Responsive Architecture

### Header & Mobile Navigation
- **Desktop (`>= 1024px`)**: Fixed top bar (`padding: 12px clamp(18px, 4vw, 48px)`), translucent warm background (`--hdbg`), brand mark on left, horizontal pill links + primary CTA pill + circular `42px` theme toggle on right. Active link indicated via bottom inset bar (`box-shadow: inset 0 -3px 0 var(--crimson)`).
- **Mobile (`<= 1023px`)**: Nav collapses into a full-screen slide-down drawer (`transform: translateY(-101%)` → `none`, `0.7s cubic-bezier(.76,0,.24,1)`) triggered by a bordered pill `Menu` button, revealing large editorial links (`clamp(2.4rem, 11vw, 4rem)`, `font-weight: 800`).

### Hero Stage
- Sticky `100svh` visual stage inside a taller scroll container (`300svh`), featuring:
  - Warm sky gradient (`#f2c49c` → `#fff1dc`) + sun glow.
  - Multi-layer horizon silhouettes + road ground band.
  - Left-side directional scrim (`.ch`) ensuring text contrast over artwork.
  - Staggered rising hero letters, italic serif slogan, action row (`btn` + `ghost`), and uppercase `Scroll to ride` hint.

### Map Canvas & Stop Grid
- **Reference vs. Generalized 7-Stop Corridor**: The reference site (`Stops 00–04`) uses `.stp.l` / `.stp.r` alternating rows plus a wide flanked `.stp.bk` block (`Book A T-Ride`). For the reusable **Waypost** template (`Stops 00–07`, adding `Features`, `Stats`, `Showcase`, and `Deploy CTA`), all stops `01..07` standardize on strictly alternating `.ws-stp-l` / `.ws-stp-r` split corridors so no dashboard or CTA card ever blocks the center SVG road spine.
- **Numbered Pins (`.ws-pin`)**: `36px` circular markers anchored directly along the inner spine edge of each card (`right: -20px` for left cards, `left: -20px` for right cards) so desktop/tablet road paths pass behind pins and follow the reference `0.55 * dy` vertical-handle cubic Beziers from `[mapRect.width / 2 - 100 * (W >= 1024 ? 1 : 0), 26]`.
- **Mobile (`<= 760px`)**: Single-column stack with left rail gutter (`padding: 0 18px 0 62px`), decorative tiles hidden so content stays fast and readable, all pins aligned neatly along the left rail (`left: -41px`), and zero horizontal overflow (`overflow-x: clip`).

### Floating Journey Gauge (`.sp`)
- Fixed right-center (`144px`, `132px` on tablet, `100px` bottom-right on mobile) circular dial showing stop numbers `0..4`, live progress arc/needle, and current stop label pill.

### Motion & Accessibility
- Smooth exponential ease-out (`cubic-bezier(.16,1,.3,1)`) for cards/tiles, springy overshoot (`cubic-bezier(.3,1.8,.5,1)`) for milestone pins, gentle floating (`flt`) and ripple (`rip`) SVG animations.
- Full `@media (prefers-reduced-motion: reduce)` fallback disabling continuous animations and shortening transitions.
- High-contrast `:focus-visible` outlines (`3px solid var(--crimson)`, `outline-offset: 3px`).

---

## 5. Translation into a Generalized Hackathon Design System

| Reference Concept | Reusable Template Abstraction |
|---|---|
| `Tuktuk` brand, Bungoma copy, ride booking | `src/config/site.config.ts` (100% swappable project config) |
| Warm cream/crimson/espresso tokens + `.dark` | `src/design-system/tokens.css`, `tokens.ts`, `themes.ts`, `ThemeProvider` |
| `Stop 00–04` pins & narrative | `NumberedPin`, `SectionHeading`, `JourneyCanvas`, `JourneyGauge` |
| Alternating `.stp.l` / `.stp.r` + `.tile` | `SplitSection` (configurable ratio, side, media/illustration slot) |
| Receipt-style feedback cards | `TestimonialsSection` + `Card` (`dashed` / `default` / `lit` variants) |
| Mobile full-screen drawer & header | `Navbar` + `MobileDrawer` |
| Hero stage vs. standard product hero | `HeroSection` supporting both `story` (layered horizon) and `split` modes |
| Missing in ref: Stats, Feature Grid, Dashboard Showcase, Empty/Loading/Error states | Added as first-class primitives (`StatsSection`, `FeaturesSection`, `DashboardLayout`, `ShowcaseSection`, `LoadingState`, `EmptyState`, `ErrorState`) |

