# Hackathon UI/UX Template Library

A monorepo collection of production-ready hackathon UI/UX starter templates. Every subfolder contains an independent template with its own design system, component library, tests, and `ANTIGRAVITY.md` engineering guide, while the root GitHub Pages workflow automatically publishes each subfolder to its own independent live URL.

## Live Deployments

- **Template Gallery (Root):** `https://<your-github-username>.github.io/hackathon-ui-ux-template/`
- **`waypost` Template:** `https://<your-github-username>.github.io/hackathon-ui-ux-template/waypost/`

*(Replace `<your-github-username>` with your GitHub handle, or fork this repository and enable GitHub Pages -> Source: **GitHub Actions**.)*

## Repository Structure

```text
hackathon-ui-ux-template/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml   # Auto-builds every subfolder and deploys _site/ to GitHub Pages
├── scripts/
│   └── build-pages.mjs        # Auto-discovers template subfolders and exports static sites
├── waypost/                   # Waypost interactive journey-map & telemetry showcase template (Next.js 16)
│   ├── ANTIGRAVITY.md
│   ├── COMPONENT_GUIDE.md
│   ├── CUSTOMIZATION_GUIDE.md
│   ├── DESIGN_SYSTEM.md
│   ├── LESSONS_LEARNED.md
│   └── ...
├── LICENSE
└── README.md
```

## Using a Template in a Hackathon (with Antigravity or Locally)

1. Point your coding agent to the template folder you want (for example `waypost/`) and ask it to read `<template>/ANTIGRAVITY.md` and `<template>/README.md` first.
2. Share or fork the repository URL (or open the live preview link for quick visual inspection).
3. Run locally inside the template directory:

```bash
cd waypost
npm install
npm run dev
```

## Adding a New Template Subfolder

The multi-template publisher in `scripts/build-pages.mjs` requires zero manual workflow edits when adding new templates:

1. Create a new top-level folder (for example `atlas/` or `pulse/`) containing a `package.json` with a `"build"` script.
2. Ensure the template produces a static output folder (`out/`, `dist/`, or `build/`) when `GITHUB_PAGES=true` and `PAGES_BASE_PATH` / `VITE_BASE_PATH` are passed:
   - **Next.js (`next.config.ts`):** read `process.env.PAGES_BASE_PATH`, set `output: 'export'`, `trailingSlash: true`, `basePath`, `assetPrefix`, and `images: { unoptimized: true }`.
   - **Vite (`vite.config.ts`):** set `base: process.env.VITE_BASE_PATH || './'`.
3. Include a `README.md` and `ANTIGRAVITY.md` inside the new folder documenting its design system and adaptation workflow.
4. Commit and push to `main`. GitHub Actions will automatically build the new subfolder and publish it at:
   `https://<your-github-username>.github.io/hackathon-ui-ux-template/<folder-name>/`

## Testing the Multi-Template Pages Build Locally

```bash
# Full install + static export of every template subfolder into _site/
node scripts/build-pages.mjs

# Fast export using existing node_modules
SKIP_INSTALL=true node scripts/build-pages.mjs
```

Clean generated `_site/` locally before committing (`_site/` is gitignored).

## GitHub Pages Compatibility Notes

- GitHub Pages hosts **static sites only** (no Node server runtime, server-side API routes, or server database connections).
- Features requiring backend persistence or live telemetry ingestion (for example optional Supabase endpoints) must connect to an external API/service or operate in static fallback mode on GitHub Pages.
