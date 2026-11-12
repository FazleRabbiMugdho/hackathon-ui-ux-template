# Credits, Asset Provenance & License Compliance Audit

This repository is an **original engineering and design-system implementation** inspired by editorial wayfinding interfaces. All source code, CSS architecture, SVG illustrations, and demonstration copy in this repository were written independently for reusable hackathon adoption.

---

## 1. Design Inspiration Reference

| Subject | Role | Ownership / Rights Status |
|---|---|---|
| [tuktuk-your-stop.foundingdev.com](https://tuktuk-your-stop.foundingdev.com/) | **Design inspiration only** (warm cream/espresso/crimson color language, multi-font editorial hierarchy, scroll-driven journey metaphor, alternating split stops, circular speedometer gauge). | Third-party website. Inspected for visual design concepts only. **No proprietary source code, brand names, logos, copy, raster images, or external assets from the reference site are redistributed in this repository.** |

> **Legal Distinction**: Visual layout concepts, color-harmony choices, and general interaction idioms are cleanly separated from protected creative expression. All React components, CSS tokens, scroll math (`src/hooks/useJourneyEngine.ts`), typography pairing, and inline SVG artwork (`src/components/visuals/waypost-illustrations.tsx`) were authored independently under the **Waypost** brand.

---

## 2. Asset & Code Provenance Classification

| Asset / Module | Location | Classification | License / Status |
|---|---|---|---|
| React components, layouts, theme engine, scroll & Bezier route engine, config system | `src/**` (excluding Google Font imports and Lucide icons) | Original implementation | MIT (this repository) |
| Custom SVG scenes (`BrandMark`, `HeroVehicle`, `TopDownRouteRider`, `CorridorHubIllustration`, `ArchitectureMeshIllustration`, `TelemetryPulseIllustration`, `CorridorStatusRailIllustration`, `FeedbackBubblesTile`, `MilestoneFlagTile`, `WayfinderPinIllustration`, scenery SVG sprites) | `src/components/visuals/waypost-illustrations.tsx`, `src/hooks/useJourneyEngine.ts`, `src/components/sections/hero-section.tsx` | Original implementation | MIT (this repository) |
| Google Fonts (`Inter`, `Fraunces`, `Pacifico`, `DM Mono`) via `next/font/google` | `src/app/layout.tsx` | Third-party dependency with verified license | SIL Open Font License 1.1 (`OFL-1.1`) |
| Icon components | `lucide-react` (`src/components/ui/icon-resolver.tsx`, UI components) | Third-party dependency with verified license | ISC |
| Demo brand, sample metrics, and fictional rider testimonials | `src/config/site.config.ts` | Original mock content | MIT (this repository) |
| External downloaded media / third-party photos / proprietary SVGs | *(None present)* | Verified absent | N/A |

---

## 3. Verified Dependency Licenses (Inspected from `node_modules/*/package.json`)

### Runtime Dependencies
| Package | Version | Verified License |
|---|---|---|
| `next` | `16.4.6` | MIT |
| `react` | `19.3.1` | MIT |
| `react-dom` | `19.3.1` | MIT |
| `framer-motion` | `14.12.0` | MIT |
| `lucide-react` | `1.72.0` | ISC |
| `@tanstack/react-query` | `5.107.1` | MIT |
| `@supabase/supabase-js` | `2.119.0` | MIT |
| `@radix-ui/react-label` | `2.1.17` | MIT |
| `@radix-ui/react-slot` | `1.5.0` | MIT |
| `@radix-ui/react-tabs` | `1.2.1` | MIT |
| `class-variance-authority` | `0.7.1` | Apache-2.0 |
| `clsx` | `2.1.1` | MIT |
| `tailwind-merge` | `3.7.0` | MIT |

### Development Dependencies
| Package | Version | Verified License |
|---|---|---|
| `typescript` | `5.7.3` | Apache-2.0 |
| `tailwindcss` | `4.3.5` | MIT |
| `@tailwindcss/postcss` | `4.3.5` | MIT |
| `eslint` | `9.39.5` | MIT |
| `@eslint/js` | `9.39.5` | MIT |
| `typescript-eslint` | `8.72.2` | MIT |
| `eslint-plugin-react-hooks` | `5.2.0` | MIT |
| `globals` | `17.14.0` | MIT |
| `vitest` | `3.2.7` | MIT |
| `@vitejs/plugin-react` | `4.7.0` | MIT |
| `@testing-library/react` | `16.3.3` | MIT |
| `@testing-library/jest-dom` | `6.9.1` | MIT |
| `@testing-library/user-event` | `14.6.10` | MIT |
| `jsdom` | `26.1.0` | MIT |
| `@types/node` | `22.20.5` | MIT |
| `@types/react` | `19.3.0` | MIT |
| `@types/react-dom` | `19.3.0` | MIT |

> **Note for Future Teams**: When adapting this template for a real hackathon, ensure any third-party logos, photographs, custom fonts, or audio/video assets you add to `public/` carry clear open licenses or permission before publishing.
