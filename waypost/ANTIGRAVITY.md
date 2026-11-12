# ANTIGRAVITY.md — Mandatory Engineering Rules for AI Coding Agents

This file defines mandatory operating rules for future Antigravity sessions adapting this template to a new hackathon problem statement.

---

## 1. Mandatory Pre-Modification Protocol (Read Before Touching Code)

Before planning or editing any code:
1. Read `README.md` and `ANTIGRAVITY.md`.
2. Read `DESIGN_SYSTEM.md`, `COMPONENT_GUIDE.md`, and `CUSTOMIZATION_GUIDE.md`.
3. Read `LESSONS_LEARNED.md` so known pitfalls are not reintroduced.
4. Inspect actual source structure first:
   - `src/config/types.ts` and `src/config/site.config.ts`
   - `src/design-system/tokens.css` and `src/design-system/themes.ts`
   - `src/components/home-page.tsx`, `src/layouts/journey-canvas.tsx`, `src/hooks/useJourneyEngine.ts`, and `src/app/globals.css`
5. Run baseline health checks (`npm run typecheck && npm run test`) before introducing changes.
6. Formulate a written adaptation plan mapping the hackathon problem statement onto `site.config.ts`, `themes.ts`, existing sections, and any truly needed new routes/features.

---

## 2. Core Architecture & Separation of Concerns

| Layer | Directory / File | Rule |
|---|---|---|
| **Domain Copy & Config** | `src/config/site.config.ts`, `src/config/types.ts` | **Edit freely** per hackathon (`projectName`, navigation, hero mode, stops, features, stats, showcase tabs, testimonials, CTA, contact, footer, `enablePreloader`). |
| **Design Tokens & Presets** | `src/design-system/tokens.css`, `src/design-system/themes.ts`, `src/design-system/themeProvider.tsx` | Select or add a `ThemePreset`; **never** hardcode Tailwind palette classes (`bg-white`, `text-gray-900`) inside reusable primitives. |
| **UI Primitives** | `src/components/ui/*` | Reuse existing shadcn-style primitives (`Button`, `Card`, `Badge`, `NumberedPin`, `SectionHeading`, `FormField`, `Tabs`, `LoadingState`, `EmptyState`, `ErrorState`). |
| **Layout Shells** | `src/layouts/*` | Reuse `PageShell`, `JourneyCanvas`, `SplitSection`, and `DashboardLayout`. Preserve `[data-card]` / `[data-pin]` / `[data-tile]` contracts used by `useJourneyEngine`. |
| **Scroll & Highway Engine** | `src/hooks/useJourneyEngine.ts`, `src/app/globals.css` | Driven dynamically by DOM pins/cards. Do not fork with hardcoded pixel routes unless replacing the entire journey canvas intentionally. |
| **Section Modules** | `src/components/sections/*` | Prop-driven consumers of `SiteConfig`. Extend cleanly rather than duplicating section markup. |
| **Optional Backend** | `src/lib/supabase/client.ts` | Keep env-gated so the app runs offline with mock data when `.env.local` is absent. |

---

## 3. Mandatory Rules During Implementation

1. **Preserve the existing architecture**: Adapt via `src/config/site.config.ts` and `src/design-system/themes.ts` first; never rebuild the UI from scratch when configuration solves the requirement.
2. **Never invent or approximate inspected mechanics**: When modifying SVG paths (`#ws-route`), vehicle handoffs (`HeroVehicle` -> `#ws-car`), or dial spring physics (`JourneyGauge`), read `src/hooks/useJourneyEngine.ts` carefully first.
3. **Never place cards across the center highway corridor**: Inside `JourneyCanvas` (`#ws-map`), keep every stop alternating `.ws-stp-l` (card left, tile right) and `.ws-stp-r` (tile left, card right), maintaining strict `1:1` parity across `.ws-stp`, `[data-card]`, and `[data-pin]`. Never reintroduce centered blocking sections over the SVG road spine.
4. **Keep Tablet/Desktop corridor grids symmetric**: In `src/app/globals.css`, Column 1 and Column 3 in `.ws-stp` must stay balanced (`minmax(0, 1fr)`) so Column 2 stays straight vertically from Stop 01 to Stop 07 on both desktop (`>= 1024px`) and tablet (`761px–1023px`).
5. **Maintain card, pin, and button alignment**: Use `SectionHeading` + `Button` pills (`rounded-full` / `--ws-radius-pill`) and keep `.ws-pin` overhang (`±20px` desktop/tablet, `-41px` left rail on mobile) intact alongside the reference `0.55 * dy` vertical-tangent Bezier route starting at `[mapRect.width / 2 - 100 * (W >= 1024 ? 1 : 0), 26]` (`[pinCenters[0][0] + 12, 26]` on mobile).
6. **Avoid conflicting CSS overrides**: Keep `--ws-*` color/typography tokens consistent; keep `<MotionConfig reducedMotion="user">` and `@media (prefers-reduced-motion: reduce)` protections intact.
7. **Keep static/GitHub Pages compatibility intact**: Avoid introducing server-only runtime requirements unless explicitly needed; keep `src/lib/supabase/client.ts` optional and ensure `next.config.ts` static export (`GITHUB_PAGES=true`) continues passing if deploying to GitHub Pages.
8. **Ensure SVG tiles work across card heights**: Wrap split-section media tiles in matching background colors so tall rows never expose awkward gaps or crop core text labels on tablet viewports.

---

## 4. Standard Adaptation Workflows

### Updating Brand, Copy & Stops
1. Edit `src/config/site.config.ts` (`projectName`, `shortTagline`, `navItems`, `hero`, `about`, `features`, `stats`, `showcase`, `testimonials`, `cta`, `contact`, `footer`).
2. Ensure every `#hash` href in `navItems` and `footer.columns[].links` corresponds to a rendered section `id` and `stops` entry in `src/components/home-page.tsx`.
3. If removing or adding a stop in `src/components/home-page.tsx`, update `stops` (`useMemo`), renumber visible stops consistently, and alternate `layout="image-right"` / `"image-left"`.

### Adding Backend Workflows (Next.js 16 + Supabase + React Query)
- Pair every React Query fetch with `<LoadingState />`, `<EmptyState />`, and `<ErrorState />` from `src/components/ui/states.tsx`.
- Keep interactive multi-route expansions under `src/app/<route>/page.tsx` wrapped in `<PageShell>` / `<DashboardLayout>`.

---

## 5. Mandatory Post-Implementation Verification Protocol

Every modification is incomplete until all steps below pass:

1. **Automated Suite**:
   ```bash
   npm run typecheck
   npm run lint
   npm run test
   npm run build
   ```
   (Plus `GITHUB_PAGES=true npm run build` if verifying static GitHub Pages export.)
2. **Multi-Viewport Visual & Geometry Check**:
   - Inspect **Desktop (`1440×900`)**, **Tablet (`900×1024` / `768px`)**, and **Mobile (`390×844`)**.
   - Verify zero horizontal overflow (`scrollWidth <= innerWidth`), zero console errors, zero broken anchor links, continuous highway path across all stops (no card slicing the road, no tablet sideways jog), and smooth hero-to-car handoff.
3. **Interactive & Theme Verification**:
   - Test light & dark mode + all 4 presets (`waypost-warm`, `civic-emerald`, `clinical-teal`, `neural-indigo`) for contrast.
   - Test `ShowcaseSection` tabs + `Live/Loading/Empty/Error` preview states, `ContactSection` validation + submit receipt, `MobileDrawer`, and `JourneyGauge` stop clicks.
4. **Documentation Sync**:
   - If you changed components, tokens, defaults, or layout rules, update `README.md`, `DESIGN_SYSTEM.md`, `COMPONENT_GUIDE.md`, and `CHANGELOG.md` before finishing.
