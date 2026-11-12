import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const defaultPagesBasePath =
  isGithubPages && repoName && !repoName.endsWith('.github.io') ? `/${repoName}` : '';
const pagesBasePath = isGithubPages ? (process.env.PAGES_BASE_PATH ?? defaultPagesBasePath) : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? 'export' : undefined,
  trailingSlash: isGithubPages || undefined,
  basePath: pagesBasePath || undefined,
  assetPrefix: pagesBasePath ? `${pagesBasePath}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

