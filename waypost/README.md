# Waypost — Reusable Hackathon Frontend Template

An original, Tuktuk-inspired editorial wayfinding design system and production-ready **Next.js 16** starter template built for rapid hackathon adaptation.

Instead of rebuilding navigation, responsive grids, theme systems, state handling, and forms from scratch at every hackathon, clone this repository, swap `src/config/site.config.ts` and your theme preset, and ship a cohesive product UI in minutes.

---

## Screenshots

> Add rendered desktop & mobile screenshots of your adapted project here before hackathon submission (recommended: `./public/screenshots/desktop.png` and `./public/screenshots/mobile.png`).

- **Desktop View**: Layered atmospheric hero, blueprint map canvas (`44px` rounded transition), alternating stop cards + SVG scenes, interactive TanStack Query showcase dashboard, receipt testimonials, and floating circular Journey Gauge.
- **Mobile View**: Single-column left-rail stop timeline, full-screen slide-down editorial drawer, compact bottom-right gauge, zero horizontal overflow.

---

## Key Features

- **Centralized Content Config (`src/config/site.config.ts`)**: Change project name, tagline, navigation, hero mode (`story` or `split`), features, stats, showcase dashboard tabs, testimonials, CTA, contact info, and footer from a single typed file.
- **Multi-Preset Design System (`src/design-system/`)**: Light & Dark mode plus 4 built-in hackathon presets (`waypost-warm`, `civic-emerald`, `clinical-teal`, `neural-indigo`) driven by CSS custom properties.
- **10 Complete Demo Sections**: Navigation + Mobile Drawer + Journey Gauge, Hero, About, Features, Impact Stats, Interactive Dashboard Showcase, Field-Receipt Testimonials, Flanked CTA, Validated Contact Form, and Footer.
- **Full UI State Coverage**: Built-in `LoadingState`, `EmptyState`, and `ErrorState` components wired into the interactive Showcase Console.
- **Backend-Optional, Supabase-Ready**: Runs 100% standalone on mock data with **TanStack React Query**, and upgrades cleanly to **Supabase** (Postgres, Auth, Storage) via `src/lib/supabase/client.ts`.
- **Accessible & Motion-Safe**: Semantic landmarks, keyboard navigation, ARIA feedback, `:focus-visible` rings, and `prefers-reduced-motion` support.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript (Strict) |
| Styling | Tailwind CSS v4 + CSS Design Tokens |
| Components | shadcn/ui pattern (`cva`, `clsx`, `tailwind-merge`, Radix Primitives) |
| Icons | Lucide React |
| Animations | Framer Motion (`MotionConfig reducedMotion="user"`) |
| State / Data | TanStack React Query v5 |
| Backend Ready | Supabase (`@supabase/supabase-js`, optional env-gated) |
| Testing | Vitest + React Testing Library + jsdom |
| Deployment | GitHub Pages (Static Export) or Vercel |

---

## Installation & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Optional Environment Variables
Copy `.env.example` to `.env.local` if connecting Supabase (not required for demo mode):
```bash
cp .env.example .env.local
```

### 3. Development Commands
```bash
npm run dev        # Start Next.js 16 dev server (Turbopack) at http://localhost:3000
npm run typecheck  # Run TypeScript strict type checking
npm run lint       # Run ESLint across all TypeScript/TSX files
npm run test       # Run Vitest + React Testing Library suite
npm run build      # Create optimized production build
npm run start      # Serve production build locally
```

---

## Project Structure

```text
waypost/
├── .github/workflows/
│   └── deploy-pages.yml               # Automated static export + GitHub Pages deploy
├── src/
│   ├── app/
│   │   ├── globals.css                # Tailwind v4 + blueprint canvas, corridor grid & responsive rules
│   │   ├── layout.tsx                 # Root fonts (Inter, Fraunces, Pacifico, DM Mono) + Providers
│   │   └── page.tsx                   # Entry route rendering HomePage
│   ├── config/
│   │   ├── types.ts                   # Strict TypeScript config interfaces
│   │   └── site.config.ts             # Single source of truth for project content
│   ├── design-system/
│   │   ├── tokens.css                 # Light & dark CSS custom properties
│   │   ├── tokens.ts                  # Typed JS/TS design tokens
│   │   ├── themes.ts                  # 4 ready-to-use hackathon color presets
│   │   └── themeProvider.tsx          # Theme context (mode + preset switching)
│   ├── layouts/
│   │   ├── page-shell.tsx             # Optional preloader, SkipLink, Navbar, JourneyGauge, main, Footer
│   │   ├── journey-canvas.tsx         # Rounded-top blueprint grid + SVG route canvas + rider overlay
│   │   ├── split-section.tsx          # Alternating card + illustration layout
│   │   └── dashboard-layout.tsx       # Reusable KPI + table/workspace shell
│   ├── components/
│   │   ├── ui/                        # shadcn-style primitives (Button, Card, Input, States, Tabs...)
│   │   ├── navigation/                # Navbar, MobileDrawer, JourneyGauge, PreloaderCurtain
│   │   ├── sections/                  # 10 composable page sections
│   │   ├── visuals/                   # Original SVG editorial illustrations
│   │   ├── home-page.tsx              # Composes all demo sections
│   │   └── providers.tsx              # QueryClientProvider + ThemeProvider + MotionConfig
│   ├── hooks/
│   │   ├── useActiveStop.ts           # StopAnchor type + standalone scroll-tracking hook
│   │   └── useJourneyEngine.ts        # Continuous Bezier route, hero handoff, parallax & gauge spring
│   ├── lib/
│   │   ├── utils.ts                   # cn() class-merging helper
│   │   └── supabase/client.ts         # Optional Supabase browser client
│   └── test/                          # Vitest setup and component integration tests
├── ANTIGRAVITY.md                     # Mandatory rules for future AI coding agents
├── COMPONENT_GUIDE.md                 # Props, responsibilities & composition guide
├── CREDITS.md                         # Asset provenance, inspiration credits & verified dependency licenses
├── CUSTOMIZATION_GUIDE.md             # Domain adaptation playbook
├── DESIGN_SYSTEM.md                   # Token & visual architecture reference
├── LESSONS_LEARNED.md                 # Engineering post-mortem & regression prevention checks
├── LICENSE                            # MIT License
├── REFERENCE_ANALYSIS.md              # Analysis of the Tuktuk reference website
└── CHANGELOG.md                       # Version history
```

---

## Quick Customization

1. **Change Copy & Brand**: Edit `src/config/site.config.ts`.
2. **Switch Visual Theme**: Set `defaultThemePreset` in `src/config/site.config.ts` to `'waypost-warm'`, `'civic-emerald'`, `'clinical-teal'`, or `'neural-indigo'`, or add your own preset in `src/design-system/themes.ts`.
3. **Swap Hero Mode**: Set `hero.variant` to `'story'` (atmospheric horizon) or `'split'` (product/dashboard split).

See [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md), [LESSONS_LEARNED.md](./LESSONS_LEARNED.md), and [ANTIGRAVITY.md](./ANTIGRAVITY.md) for full workflows.

---

## Deployment

### Option A — Deploy Directly on GitHub Pages (Free Static Hosting)
Because the template has no required backend in demo mode, `next.config.ts` supports full static export when `GITHUB_PAGES=true` and includes `.github/workflows/deploy-pages.yml`:
1. Push this directory to a GitHub repository (branch `main`).
2. In your GitHub repo open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. On every push to `main` (or manual workflow run), GitHub builds `./out` with automatic repository `basePath` detection and publishes to `https://<username>.github.io/<repo>/`.

> **Supabase Note**: Static GitHub Pages sites can still connect directly from the browser to Supabase (`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` via repository Actions secrets/variables), keeping only public anon keys client-side.

### Option B — Deploy on Vercel
1. Push this directory to GitHub.
2. Import the repository in **Vercel** (Next.js 16 is auto-detected).
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel Environment Variables if using Supabase.
4. Deploy.

