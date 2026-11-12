import type { ThemeMode } from '@/design-system/tokens';

export type LucideIconName =
  | 'compass'
  | 'zap'
  | 'shield-check'
  | 'radio'
  | 'map-pin'
  | 'bar-chart-3'
  | 'clock'
  | 'users'
  | 'leaf'
  | 'activity'
  | 'sparkles'
  | 'layers'
  | 'phone'
  | 'mail'
  | 'arrow-up-right'
  | 'check-circle-2';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  stopNumber: string;
  isCta?: boolean;
}

export interface ActionLink {
  label: string;
  href: string;
}

export interface HeroConfig {
  variant: 'story' | 'split';
  stopLabel: string;
  headline: string;
  tagline: string;
  description: string;
  primaryCta: ActionLink;
  secondaryCta: ActionLink;
  scrollHint: string;
  highlights: { label: string; value: string }[];
}

export interface BulletPoint {
  title: string;
  description: string;
}

export interface AboutConfig {
  id: string;
  stopNumber: number;
  eyebrow: string;
  title: string;
  lede: string;
  points: BulletPoint[];
  cta: ActionLink;
  visualLayout: 'image-right' | 'image-left';
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: LucideIconName;
}

export interface FeaturesConfig {
  id: string;
  stopNumber: number;
  eyebrow: string;
  title: string;
  lede: string;
  items: FeatureItem[];
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  context: string;
  delta?: string;
}

export interface StatsConfig {
  id: string;
  stopNumber: number;
  eyebrow: string;
  title: string;
  lede: string;
  items: StatItem[];
}

export interface ShowcaseMetric {
  label: string;
  value: string;
  status: 'healthy' | 'warning' | 'info';
}

export interface ShowcaseNodeRow {
  id: string;
  corridor: string;
  load: string;
  uptime: string;
  status: 'online' | 'standby';
}

export interface ShowcaseTab {
  id: string;
  label: string;
  summary: string;
  metrics: ShowcaseMetric[];
  rows: ShowcaseNodeRow[];
}

export interface ShowcaseConfig {
  id: string;
  stopNumber: number;
  eyebrow: string;
  title: string;
  lede: string;
  tabs: ShowcaseTab[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  receiptCode: string;
  rating: number;
  quote: string;
  metaLeft: string;
  metaRight: string;
}

export interface TestimonialsConfig {
  id: string;
  stopNumber: number;
  eyebrow: string;
  title: string;
  lede: string;
  items: TestimonialItem[];
}

export interface CtaConfig {
  id: string;
  stopNumber: number;
  eyebrow: string;
  title: string;
  emphasisLine: string;
  description: string;
  primaryCta: ActionLink;
  secondaryCta: ActionLink;
}

export interface ContactConfig {
  id: string;
  stopNumber: number;
  eyebrow: string;
  title: string;
  lede: string;
  location: string;
  phone: string;
  email: string;
  hoursLabel: string;
  hoursValue: string;
  formTitle: string;
  formSubtitle: string;
  roles: string[];
  demoNotice: string;
}

export interface FooterColumn {
  title: string;
  links?: ActionLink[];
  lines?: string[];
}

export interface FooterConfig {
  brandTitle: string;
  brandTagline: string;
  columns: FooterColumn[];
  copyright: string;
}

export interface SiteConfig {
  projectName: string;
  shortTagline: string;
  defaultThemePreset: string;
  defaultThemeMode: ThemeMode | 'system';
  enablePreloader: boolean;
  preloaderText: string;
  showJourneyGauge: boolean;
  showThemePresetSwitcher: boolean;
  navItems: NavItem[];
  hero: HeroConfig;
  about: AboutConfig;
  features: FeaturesConfig;
  stats: StatsConfig;
  showcase: ShowcaseConfig;
  testimonials: TestimonialsConfig;
  cta: CtaConfig;
  contact: ContactConfig;
  footer: FooterConfig;
}

