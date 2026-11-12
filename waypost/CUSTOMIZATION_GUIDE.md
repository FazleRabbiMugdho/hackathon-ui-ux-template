# Hackathon Customization Guide

This template is designed so you can adapt it to almost any hackathon track in **under 15 minutes** without rewriting layout mechanics.

---

## Step-by-Step Adaptation Workflow

1. **Choose a Theme Preset** in `src/config/site.config.ts`:
   - `waypost-warm` — Civic, Mobility, Food, Local Commerce, Community
   - `civic-emerald` — Climate, Agriculture, Sustainability, BioTech
   - `clinical-teal` — Healthcare, Diagnostics, Mental Health, EdTech
   - `neural-indigo` — AI/ML, Developer Tools, Fintech, SaaS
2. **Choose Hero Mode**:
   - `'story'` for narrative, civic, climate, or consumer products.
   - `'split'` for B2B SaaS, AI dashboards, or developer tools.
3. **Update `src/config/site.config.ts`**: Replace `projectName`, `enablePreloader` (`false` by default for instant hero load), `navItems`, `hero`, `about`, `features`, `stats`, `showcase`, `testimonials`, `cta`, `contact`, and `footer`.
4. **Preserve Alternating Stop Geometry**: Keep sections inside `JourneyCanvas` alternating (`image-right` / `image-left`) with matching `stops` anchors in `src/components/home-page.tsx` so the SVG route weaves unobstructed between cards and tiles.
5. **Optional Backend Wiring**: Populate `.env.local` from `.env.example` and replace mock query functions in `ShowcaseSection` or `ContactSection` with `getSupabaseBrowserClient()` from `src/lib/supabase/client.ts`. For static GitHub Pages deployments without a Node server, demo mode and browser-side Supabase queries work directly from static `./out` exports.

---

## Domain Adaptation Recipes

### 1. AI / ML Projects
- **Theme**: `defaultThemePreset: 'neural-indigo'`, `defaultThemeMode: 'dark'` or `'light'`.
- **Hero**: `hero.variant = 'split'` showing a model pipeline card or live inference preview.
- **Stops Framing**: `Stop 01 · Problem` → `Stop 02 · Model Architecture` → `Stop 03 · Benchmarks` (F1, latency, cost) → `Stop 04 · Interactive Playground` (use `DashboardLayout` + `Tabs` + `LoadingState` during inference!).
- **Testimonials**: Replace with Judge/Reviewer evaluation cards or dataset audit receipts.

### 2. Healthcare & MedTech Projects
- **Theme**: `defaultThemePreset: 'clinical-teal'`, `defaultThemeMode: 'light'`.
- **Copy Tone**: Clear, calm, high-contrast WCAG-friendly wording; use `Badge variant="positive"` for verified triage checks and `Badge variant="warning"` for escalation flags.
- **Stops Framing**: `Stop 01 · Patient Intake` → `Stop 02 · Triage Protocol` → `Stop 03 · Clinical Impact` → `Stop 04 · Clinician View` (`DashboardLayout`).
- **Contact Form**: Adapt `contact.roles` to `['Clinician', 'Clinic Admin', 'Research Partner']`.

### 3. Agriculture & Climate / Environmental Projects
- **Theme**: `defaultThemePreset: 'civic-emerald'`, `defaultThemeMode: 'light'`.
- **Hero**: `hero.variant = 'story'` works naturally with the horizon hills, sun, and road/corridor silhouettes.
- **Stops Framing**: `Stop 01 · Soil / Watershed Challenge` → `Stop 02 · Sensor & Satellite Stack` → `Stop 03 · Yield & Water Savings` → `Stop 04 · Cooperative Monitor` (`ShowcaseSection`).
- **Visuals**: Swap SVG scenes in `src/components/visuals/waypost-illustrations.tsx` or pass custom imagery into `SplitSection media={...}`.

### 4. Social-Impact & Civic Tech Projects
- **Theme**: `defaultThemePreset: 'waypost-warm'` (warm, approachable, non-intimidating).
- **Stops Framing**: Keep the receipt-style `TestimonialsSection` for citizen voices, maintenance records, or transparency logs.
- **Journey Gauge**: Keep `showJourneyGauge: true` to make multi-step community stories playful and easy to jump through.

### 5. SaaS & Developer Tools
- **Theme**: `defaultThemePreset: 'neural-indigo'` or create a custom brand preset in `src/design-system/themes.ts`.
- **Hero**: `hero.variant = 'split'` with highlight pills (`99.9% SLA`, `< 15ms Edge`, `MIT`).
- **Showcase**: Turn `ShowcaseSection` tabs into `Pricing / Tiers`, `API Latency`, or `SDK Quickstart`, leveraging `DashboardLayout` + `Tabs`.
- **Supabase Auth/DB**: Add `/dashboard` route in `src/app/dashboard/page.tsx` reusing `PageShell` + `DashboardLayout` + `LoadingState` / `EmptyState` / `ErrorState`.

