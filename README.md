# Hackathon UI/UX Template Library

A monorepo collection of production-ready hackathon UI/UX starter templates. Every subfolder contains an independent template with its own design system, component library, tests, and `ANTIGRAVITY.md` engineering guide, while the root GitHub Pages workflow automatically publishes each subfolder to its own independent live URL.

## Live Deployments

- **All Templates Gallery (Auto-Updated Index):** https://fazlerabbimugdho.github.io/hackathon-ui-ux-template/
- **Repository:** https://github.com/FazleRabbiMugdho/hackathon-ui-ux-template

Every top-level folder containing a `package.json` automatically gets its own independent live URL using this pattern:

```text
https://fazlerabbimugdho.github.io/hackathon-ui-ux-template/<folder-name>/
```

### Templates Directory

| Template | Stack | Independent Live URL | GitHub Source Folder | Agent Guide |
|---|---|---|---|---|
| **waypost** | Next.js 16 | https://fazlerabbimugdho.github.io/hackathon-ui-ux-template/waypost/ | [waypost/](https://github.com/FazleRabbiMugdho/hackathon-ui-ux-template/tree/main/waypost) | [waypost/ANTIGRAVITY.md](https://github.com/FazleRabbiMugdho/hackathon-ui-ux-template/blob/main/waypost/ANTIGRAVITY.md) |

*(Every new template subfolder pushed to `main` also appears automatically as a clickable card at the [Root Showcase Gallery](https://fazlerabbimugdho.github.io/hackathon-ui-ux-template/).)*

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

## Using a Specific Template in a Hackathon (with Antigravity)

Give Antigravity **both** the **GitHub subfolder link** (for the source code, `ANTIGRAVITY.md`, design tokens, and components) **and** the **specific live URL** (for visual previewing):

1. **Copy only the template you need** into a fresh hackathon repo (so you don't carry other templates):
   ```bash
   npx degit FazleRabbiMugdho/hackathon-ui-ux-template/waypost my-hackathon-app
   cd my-hackathon-app
   npm install
   npm run dev
   ```
   *(Or clone the whole repo `git clone https://github.com/FazleRabbiMugdho/hackathon-ui-ux-template.git` and work inside `waypost/`.)*
2. **Share the specific links with Antigravity** using a prompt like:
   > Adapt the `waypost` template (`https://github.com/FazleRabbiMugdho/hackathon-ui-ux-template/tree/main/waypost`, live preview: `https://fazlerabbimugdho.github.io/hackathon-ui-ux-template/waypost/`) for my hackathon project **[Your App Name]**. First read `ANTIGRAVITY.md`, `DESIGN_SYSTEM.md`, and `COMPONENT_GUIDE.md` inside that template before modifying `src/config/site.config.ts`.

## Adding a New Template Subfolder

The multi-template publisher in `scripts/build-pages.mjs` requires zero manual workflow edits when adding new templates:

1. Create a new top-level folder (for example `atlas/` or `pulse/`) containing a `package.json` with a `"build"` script.
2. Ensure the template produces a static output folder (`out/`, `dist/`, or `build/`) when `GITHUB_PAGES=true` and `PAGES_BASE_PATH` / `VITE_BASE_PATH` are passed:
   - **Next.js (`next.config.ts`):** read `process.env.PAGES_BASE_PATH`, set `output: 'export'`, `trailingSlash: true`, `basePath`, `assetPrefix`, and `images: { unoptimized: true }`.
   - **Vite (`vite.config.ts`):** set `base: process.env.VITE_BASE_PATH || './'`.
3. Include a `README.md` and `ANTIGRAVITY.md` inside the new folder documenting its design system and adaptation workflow.
4. Commit and push to `main`. GitHub Actions will automatically build the new subfolder and publish it at:
   `https://fazlerabbimugdho.github.io/hackathon-ui-ux-template/<folder-name>/`
   *(Optionally add a row for `<folder-name>` to the Templates Directory table above for quick access on GitHub.)*

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

