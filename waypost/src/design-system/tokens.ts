/**
 * Typed Design System Tokens
 * Single source of truth for JavaScript/TypeScript consumers (charts, SVG, animations, theme presets).
 */

export type ThemeMode = 'light' | 'dark';

export interface PaletteTokens {
  bg: string;
  surface: string;
  surfaceMuted: string;
  ink: string;
  inkSecondary: string;
  accent: string;
  accentHover: string;
  accentText: string;
  accentContrast: string;
  accentRing: string;
  positive: string;
  positiveBg: string;
  warning: string;
  warningBg: string;
  danger: string;
  dangerBg: string;
  mapPark: string;
  mapParkBorder: string;
  mapWater: string;
  mapWaterBorder: string;
  skyTop: string;
  skyBottom: string;
  sun: string;
  horizonHill: string;
  horizonFar: string;
  horizonMid: string;
  horizonNear: string;
  road: string;
  roadBorder: string;
  heroScrim: string;
  headerBg: string;
  hoverTint: string;
  gridLine: string;
  borderDashed: string;
  borderSubtle: string;
  footerBg: string;
  footerInk: string;
  footerAccent: string;
}

export interface TypographyTokens {
  sans: string;
  serif: string;
  script: string;
  mono: string;
  scale: {
    displayHero: string;
    sectionTitle: string;
    cardTitle: string;
    lede: string;
    body: string;
    eyebrow: string;
    monoMeta: string;
  };
  weights: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
    black: number;
  };
}

export interface RadiusTokens {
  canvas: string;
  card: string;
  pill: string;
  input: string;
  inner: string;
  full: string;
}

export interface SpacingTokens {
  gridSize: string;
  containerMax: string;
  containerReading: string;
  sectionGap: string;
  cardPadding: string;
}

export interface MotionTokens {
  easeOut: string;
  easePop: string;
  easeDrawer: string;
  durationFastMs: number;
  durationBaseMs: number;
  durationSlowMs: number;
}

export interface BreakpointTokens {
  mobileMax: number;
  tabletMax: number;
  desktopMin: number;
  wideMin: number;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  light: PaletteTokens;
  dark: PaletteTokens;
  fonts?: Partial<Pick<TypographyTokens, 'sans' | 'serif' | 'script' | 'mono'>>;
}

export const TYPOGRAPHY_TOKENS: TypographyTokens = {
  sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  serif: "'Fraunces', Georgia, 'Times New Roman', serif",
  script: "'Pacifico', 'Fraunces', cursive",
  mono: "'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  scale: {
    displayHero: 'clamp(3.25rem, 11vw, 8.75rem)',
    sectionTitle: 'clamp(1.85rem, 3.4vw, 3rem)',
    cardTitle: 'clamp(1.25rem, 1.8vw, 1.6rem)',
    lede: 'clamp(1.08rem, 1.4vw, 1.25rem)',
    body: '1rem',
    eyebrow: '1.1rem',
    monoMeta: '0.78rem',
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
};

export const RADIUS_TOKENS: RadiusTokens = {
  canvas: '44px',
  card: '30px',
  pill: '28px',
  input: '22px',
  inner: '20px',
  full: '9999px',
};

export const SPACING_TOKENS: SpacingTokens = {
  gridSize: '56px',
  containerMax: '80rem',
  containerReading: '47.5rem',
  sectionGap: 'clamp(44px, 6vw, 88px)',
  cardPadding: 'clamp(24px, 3vw, 40px)',
};

export const MOTION_TOKENS: MotionTokens = {
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easePop: 'cubic-bezier(0.3, 1.8, 0.5, 1)',
  easeDrawer: 'cubic-bezier(0.76, 0, 0.24, 1)',
  durationFastMs: 180,
  durationBaseMs: 350,
  durationSlowMs: 650,
};

export const BREAKPOINTS: BreakpointTokens = {
  mobileMax: 760,
  tabletMax: 1023,
  desktopMin: 1024,
  wideMin: 1280,
};

