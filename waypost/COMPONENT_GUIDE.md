# Component Guide

All reusable primitives live in `src/components/ui/`, layout containers in `src/layouts/`, navigation in `src/components/navigation/`, and composable page blocks in `src/components/sections/`.

---

## 1. UI Primitives (`src/components/ui/`)

### `Button` (`button.tsx`)
- **Variants**: `default` (crimson pill), `outline` (bordered pill), `secondary` (muted pill), `ghost`, `link`.
- **Sizes**: `sm`, `default`, `lg`, `icon`.
- **Key Props**: `asChild?: boolean` (Radix Slot for links), `isLoading?: boolean` (renders Lucide spinner & disables button).
```tsx
<Button variant="default" size="lg" isLoading={saving}>
  Deploy Corridor
</Button>
```

### `Card` (`card.tsx`)
- **Variants**: `default` (paper surface + secondary border), `lit` (accent border + halo ring), `dashed` (receipt card style), `muted`.
- **Padding**: `none | sm | md | lg`.
- **Subcomponents**: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### `NumberedPin` (`numbered-pin.tsx`)
- **Props**: `number: number | string`, `active?: boolean`, `position?: 'inline' | 'edge-right' | 'edge-left' | 'top-center'`, `label?: string`.
- Anchors stop numbers along the corridor spine on desktop and neatly along the left rail on mobile.

### `SectionHeading` (`section-heading.tsx`)
- **Props**: `eyebrow?: string`, `title: string`, `lede?: string`, `align?: 'left' | 'center'`, `as?: 'h1' | 'h2' | 'h3'`.

### `Badge` (`badge.tsx`)
- **Variants**: `eyebrow` (Pacifico script), `mono` (uppercase metadata), `pill`, `positive`, `warning`, `danger`.

### `FormField`, `Input`, `Textarea`, `Select` (`form-field.tsx`)
- Accessible label-to-input wiring, required asterisk, `hasError` border styling, `role="alert"` error message, and helper text.

### `LoadingState`, `EmptyState`, `ErrorState` (`states.tsx`)
- **`LoadingState`**: `title`, `description`, `rows` (skeleton rows).
- **`EmptyState`**: `title`, `description`, `actionLabel`, `onAction`, `icon`.
- **`ErrorState`**: `title`, `description`, `retryLabel`, `onRetry` (`role="alert"`).

### `Tabs` (`tabs.tsx`)
- Built on `@radix-ui/react-tabs` with pill-style triggers matching the editorial ink border.

---

## 2. Layout Components (`src/layouts/`)

### `PageShell` (`page-shell.tsx`)
Provides optional `<PreloaderCurtain>` (gated by `config.enablePreloader`), `<SkipLink>`, `<Navbar>`, optional `<JourneyGauge>`, `<main id="main-content">`, and `<Footer>`, wiring `useJourneyEngine(stops, presetId)` and passing `{ activeIndex, activeId, scrollToStop }` via render prop.

### `JourneyCanvas` (`journey-canvas.tsx`)
Provides `#ws-map` (`44px` rounded-top `56px` blueprint grid container), dynamic SVG Bezier highway spine (`#ws-route` / `#ws-trail`), scenery overlay (`#ws-scn`), and top-down animated rider (`#ws-car`).

### `SplitSection` (`split-section.tsx`)
- **Props**: `id`, `stopNumber`, `active`, `layout?: 'image-right' | 'image-left'`, `ratio?: '50-50' | '60-40'`, `content`, `media`.
- Renders symmetric alternating `.ws-stp` (`ws-stp-l` / `ws-stp-r`) stop rows with `[data-card]`, `[data-pin]`, and parallax `[data-tile]` (`ratio` is kept symmetric on desktop/tablet when using the center corridor grid so Column 2 stays vertically aligned).

### `DashboardLayout` (`dashboard-layout.tsx`)
- **Props**: `toolbar`, `kpis`, `main`, `aside`, `stackAside?: boolean`.
- Drop-in shell for AI inference workspaces, sensor tables, or analytics dashboards (`stackAside` stacks the aside below the main panel inside Stop 04's single split column).

---

## 3. Navigation (`src/components/navigation/`)

- **`PreloaderCurtain`**: Optional full-screen intro curtain controlled by `siteConfig.enablePreloader` (`false` by default).
- **`Navbar`**: Sticky header with `BrandMark`, active-stop bottom indicator, theme preset menu (`waypost-warm`, `civic-emerald`, `clinical-teal`, `neural-indigo`), light/dark toggle, and mobile drawer trigger.
- **`MobileDrawer`**: Full-screen slide-down menu with `Escape` handling and body scroll locking.
- **`JourneyGauge`**: Floating circular dial driven by `useJourneyEngine` spring needle physics with hover/focus preview tooltips (`#ws-sp-tip`) and clickable stop anchors.

---

## 4. Composing a New Section

To add a custom section inside `HomePage`:
1. Add a stop anchor to the `stops` array in `src/components/home-page.tsx`.
2. Wrap your content in `<SplitSection layout="image-right" | "image-left" ... />` (or a `<section className="ws-stp ws-stp-l|r">` paired with `[data-card]` and `<NumberedPin>` + `[data-tile]`) so `useJourneyEngine` connects a continuous Bezier segment through `[data-pin]` without overlapping the center corridor.
3. Place it inside `<JourneyCanvas>` alternating sides cleanly from the previous stop.

