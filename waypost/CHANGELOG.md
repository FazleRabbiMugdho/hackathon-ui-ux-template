# Changelog

All notable changes to the **Waypost** reusable hackathon frontend design system will be documented in this file.

## [1.2.0] - 2026-11-12
### Fixed, Audited & Hardened
- **Strict Alternating Route Corridor (Stops 01–07)**: Converted Stop `04` (`ShowcaseSection`) and Stop `06` (`CtaSection`) from centered spanning layouts to alternating `image-left` split rows and standardized Stop `07` (`ContactSection`) so zero cards obstruct the central Bezier road spine.
- **Reference Road Geometry & Tablet Symmetry**: Restored exact reference SVG highway geometry (`[mapRect.width / 2 - 100 * (W >= 1024 ? 1 : 0), 26]` desktop/tablet start and `[pinCenters[0][0] + 12, 26]` mobile start, uniform `0.55 * dy` vertical cubic Beziers, `clamp(110px, 12vw, 190px)` center corridor, `±20px` desktop/tablet pin overhang, and `-41px` mobile pin alignment) while replacing asymmetric `1.5fr / 1fr` tablet columns (`761px–1023px`) with a symmetric `minmax(0, 1fr) clamp(84px, 10vw, 120px) minmax(0, 1fr)` grid.
- **Instant First Paint Default**: Added `enablePreloader?: boolean` in `SiteConfig` and defaulted `site.config.ts` to `false` so landing visitors see the hero immediately without a fullscreen curtain delay.
- **Concentric Hero-to-Route Handoff**: Aligned `#ws-ttw` shrink transform-origin (`50% 72%`) with `#ws-car`'s viewport handoff anchor (`H - bottomInset - 0.28 * wrapHeight`) and removed conflicting X-axis tilt offsets.
- **Illustration Framing & Footer Safety**: Wrapped Stop `02`, `04`, and `05` SVG tiles in full-bleed backdrop containers (`CorridorStatusRailIllustration`, `ArchitectureMeshIllustration`, `FeedbackBubblesTile`) and scoped `Footer` `preventDefault()` strictly to `#` anchor links.
- **GitHub Readiness & Compliance**: Added MIT `LICENSE`, `CREDITS.md` (with verified manifest licenses), `LESSONS_LEARNED.md`, hardened `ANTIGRAVITY.md`, aligned package/folder naming to `waypost-hackathon-template`, and added `GITHUB_PAGES=true` static export support + `.github/workflows/deploy-pages.yml`.

## [1.1.0] - 2026-11-12
### Changed & Added
- **Reference Visual & Motion Fidelity Pass**:
  - Added `PreloaderCurtain` (`#ws-preloader`) with bobbing `BrandMark`, `0→100` cubic ease-out readout, progress bar, and reduced-motion/test-env safeguards.
  - Recreated `BrandMark` (signature side-profile silhouette), `HeroVehicle` (`#ws-hero-vehicle` with spoked rotating wheels), and `TopDownRouteRider` (`#ws-route-rider-g`) in `src/components/visuals/waypost-illustrations.tsx`.
  - Added `useJourneyEngine` (`src/hooks/useJourneyEngine.ts`) to power the `300svh` sticky hero stage (`#ws-stage`), 3-keyframe sky interpolation, solar arc, 4 masked parallax skyline/foliage layers, road scroll, cubic Bezier `#ws-route` + progressive `#ws-trail` drawing, tangent-steered rider, deterministic pop-in scenery props, `.lit`/`.on` stop cards/pins, `.scene` parallax tiles, and spring-damped speedometer needle.
  - Upgraded `JourneyGauge` with major/minor SVG ticks, redline arc, `#ws-sp-tip` hover/focus preview tooltip, and footer fade handling.
  - Added alternating `side="left" | "right"` card entrance transitions while enforcing 1:1 `[data-card]` / `[data-pin]` parity across all 7 route stops.

## [1.0.0] - 2026-11-12
### Added
- **Reference Analysis (`REFERENCE_ANALYSIS.md`)**: Documented layout, typography, light/dark color tokens, radii, motion, and responsive behavior derived from `https://tuktuk-your-stop.foundingdev.com/`.
- **Design System (`src/design-system/`)**: Centralized CSS custom properties (`tokens.css`), typed TS tokens (`tokens.ts`), 4 domain presets (`waypost-warm`, `civic-emerald`, `clinical-teal`, `neural-indigo`), and `ThemeProvider` with persisted mode/preset selection.
- **Reusable UI Library (`src/components/ui/`)**: shadcn/ui-aligned `Button`, `Card`, `Badge`, `NumberedPin`, `SectionHeading`, `FormField`/`Input`/`Textarea`/`Select`, `Tabs`, `LoadingState`, `EmptyState`, and `ErrorState`.
- **Layout System (`src/layouts/`)**: `PageShell`, `JourneyCanvas` (blueprint grid + spine), `SplitSection`, and `DashboardLayout`.
- **Navigation (`src/components/navigation/`)**: Sticky `Navbar`, full-screen editorial `MobileDrawer`, and floating `JourneyGauge` synced to `useActiveStop`.
- **Complete 10-Section Demo (`src/components/home-page.tsx`)**: Powered by `src/config/site.config.ts`, TanStack React Query, Framer Motion, and optional Supabase client readiness.
- **Test Suite (`src/test/template.test.tsx`)**: Automated Vitest + React Testing Library coverage for sections, theme toggling, preset switching, mobile drawer, interactive dashboard states, and form validation.
- **Documentation**: `README.md`, `DESIGN_SYSTEM.md`, `COMPONENT_GUIDE.md`, `CUSTOMIZATION_GUIDE.md`, `ANTIGRAVITY.md`, `.env.example`.

