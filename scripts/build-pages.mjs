import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const SITE_DIR = path.join(ROOT_DIR, '_site');
const IGNORED_DIRS = new Set(['.git', '.github', 'node_modules', 'scripts', '_site']);

const repoFullName = process.env.GITHUB_REPOSITORY || '';
const repoName = repoFullName.split('/')[1] || 'hackathon-ui-ux-template';
const repoOwner = repoFullName.split('/')[0] || '';
const isUserSite = repoName.endsWith('.github.io');
const repoBasePath =
  process.env.ROOT_BASE_PATH !== undefined
    ? process.env.ROOT_BASE_PATH.replace(/\/+$/, '')
    : isUserSite
      ? ''
      : `/${repoName}`;

const skipInstall = process.env.SKIP_INSTALL === 'true';

function runCommand(command, args, cwd, extraEnv = {}) {
  const isWin = process.platform === 'win32';
  const result = isWin
    ? spawnSync(`${command} ${args.join(' ')}`, [], {
        cwd,
        env: { ...process.env, ...extraEnv },
        stdio: 'inherit',
        shell: true,
      })
    : spawnSync(command, args, {
        cwd,
        env: { ...process.env, ...extraEnv },
        stdio: 'inherit',
      });

  if (result.status !== 0) {
    throw new Error(`Command failed (${command} ${args.join(' ')}) in ${cwd} with exit code ${result.status}`);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function discoverTemplates() {
  const entries = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
  const templates = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('.') || IGNORED_DIRS.has(entry.name)) continue;

    const dir = path.join(ROOT_DIR, entry.name);
    const pkgPath = path.join(dir, 'package.json');
    if (!fs.existsSync(pkgPath)) continue;

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    const framework = allDeps.next ? 'Next.js' : allDeps.vite ? 'Vite' : 'Web App';
    const hasLockfile = fs.existsSync(path.join(dir, 'package-lock.json'));
    const hasAntigravityGuide = fs.existsSync(path.join(dir, 'ANTIGRAVITY.md'));

    templates.push({
      folder: entry.name,
      dir,
      name: pkg.name || entry.name,
      description: pkg.description || `Static UI/UX starter template located in ${entry.name}/`,
      framework,
      hasLockfile,
      hasAntigravityGuide,
    });
  }

  return templates.sort((a, b) => a.folder.localeCompare(b.folder));
}

function findExportOutputDir(templateDir) {
  for (const candidate of ['out', 'dist', 'build']) {
    const fullPath = path.join(templateDir, candidate);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      return fullPath;
    }
  }
  return null;
}

function renderGalleryHtml(templates) {
  const cards = templates
    .map((tpl) => {
      const liveHref = `./${encodeURIComponent(tpl.folder)}/`;
      const pathDisplay = `${repoBasePath}/${tpl.folder}/`;
      const originPreview = repoOwner
        ? `https://${repoOwner.toLowerCase()}.github.io${pathDisplay}`
        : pathDisplay;

      return `
        <article class="card">
          <div class="card-top">
            <span class="badge">${escapeHtml(tpl.framework)}</span>
            <span class="folder">${escapeHtml(tpl.folder)}/</span>
          </div>
          <h2>${escapeHtml(tpl.folder)}</h2>
          <p class="desc">${escapeHtml(tpl.description)}</p>
          <div class="meta-row">
            <code>${escapeHtml(originPreview)}</code>
          </div>
          <div class="actions">
            <a class="btn-primary" href="${liveHref}">Open Live Preview</a>
            ${
              tpl.hasAntigravityGuide
                ? `<span class="guide-pill">ANTIGRAVITY.md included</span>`
                : ''
            }
          </div>
        </article>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hackathon UI/UX Templates</title>
  <style>
    :root {
      --bg: #f6f8fa;
      --surface: #ffffff;
      --ink: #0f172a;
      --muted: #475569;
      --border: #e2e8f0;
      --accent: #0f172a;
      --accent-soft: #e2e8f0;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.5;
    }
    .wrap {
      max-width: 1080px;
      margin: 0 auto;
      padding: 48px 24px 72px;
    }
    header {
      margin-bottom: 36px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border);
    }
    .eyebrow {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 10px;
    }
    h1 {
      margin: 0 0 10px;
      font-size: clamp(28px, 4vw, 40px);
      line-height: 1.15;
      letter-spacing: -0.02em;
    }
    .subtitle {
      margin: 0;
      max-width: 680px;
      color: var(--muted);
      font-size: 16px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .badge {
      font-size: 12px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--ink);
    }
    .folder {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 13px;
      color: var(--muted);
    }
    h2 {
      margin: 0;
      font-size: 22px;
      text-transform: capitalize;
    }
    .desc {
      margin: 0;
      color: var(--muted);
      font-size: 14px;
      flex: 1;
    }
    .meta-row code {
      display: block;
      font-size: 12px;
      padding: 8px 10px;
      border-radius: 8px;
      background: #f1f5f9;
      color: #334155;
      overflow-x: auto;
      white-space: nowrap;
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 4px;
      flex-wrap: wrap;
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 9px 16px;
      border-radius: 8px;
      background: var(--accent);
      color: #ffffff;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }
    .btn-primary:hover {
      opacity: 0.9;
    }
    .guide-pill {
      font-size: 12px;
      color: var(--muted);
    }
  </style>
</head>
<body>
  <main class="wrap">
    <header>
      <span class="eyebrow">Multi-Template GitHub Pages Showcase</span>
      <h1>Hackathon UI/UX Templates</h1>
      <p class="subtitle">
        Each subfolder in this repository builds into its own independent static deployment path so you can preview, share, and adapt any template immediately.
      </p>
    </header>
    <section class="grid" aria-label="Available templates">
      ${cards}
    </section>
  </main>
</body>
</html>
`;
}

function main() {
  const templates = discoverTemplates();
  if (templates.length === 0) {
    throw new Error('No template subdirectories with package.json were found.');
  }

  fs.rmSync(SITE_DIR, { recursive: true, force: true });
  fs.mkdirSync(SITE_DIR, { recursive: true });

  for (const tpl of templates) {
    const templateBasePath = `${repoBasePath}/${tpl.folder}`;
    console.log(`\n=== Building template: ${tpl.folder} (basePath: ${templateBasePath}) ===`);

    if (!skipInstall) {
      const installCmd = tpl.hasLockfile ? ['ci'] : ['install'];
      runCommand('npm', installCmd, tpl.dir);
    }

    runCommand('npm', ['run', 'build'], tpl.dir, {
      GITHUB_PAGES: 'true',
      PAGES_BASE_PATH: templateBasePath,
      VITE_BASE_PATH: `${templateBasePath}/`,
    });

    const exportDir = findExportOutputDir(tpl.dir);
    if (!exportDir) {
      throw new Error(
        `Template "${tpl.folder}" build did not produce an "out", "dist", or "build" directory.`
      );
    }

    const targetDir = path.join(SITE_DIR, tpl.folder);
    fs.cpSync(exportDir, targetDir, { recursive: true });
    console.log(`Copied ${path.relative(ROOT_DIR, exportDir)} -> _site/${tpl.folder}/`);
  }

  fs.writeFileSync(path.join(SITE_DIR, '.nojekyll'), '');
  fs.writeFileSync(path.join(SITE_DIR, 'index.html'), renderGalleryHtml(templates), 'utf8');
  console.log(`\nBuilt ${templates.length} template(s) into _site/ successfully.`);
}

main();
