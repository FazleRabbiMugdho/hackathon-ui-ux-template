import type { SiteConfig } from './types';

/**
 * Centralized Project & Content Configuration
 * ---------------------------------------------------------------------------
 * Adapting this template for a new hackathon starts right here.
 * Update brand copy, stops, features, stats, showcase tabs, and theme preset
 * without rewriting any layout or UI primitive.
 */
export const siteConfig: SiteConfig = {
  projectName: 'Waypost',
  shortTagline: 'Every block, connected.',
  defaultThemePreset: 'waypost-warm',
  defaultThemeMode: 'light',
  enablePreloader: false,
  preloaderText: 'Starting the engine',
  showJourneyGauge: true,
  showThemePresetSwitcher: true,

  navItems: [
    { id: 'home', label: 'Start', href: '#home', stopNumber: '00' },
    { id: 'about', label: 'Mission', href: '#about', stopNumber: '01' },
    { id: 'features', label: 'System', href: '#features', stopNumber: '02' },
    { id: 'stats', label: 'Impact', href: '#stats', stopNumber: '03' },
    { id: 'showcase', label: 'Console', href: '#showcase', stopNumber: '04' },
    { id: 'contact', label: 'Deploy', href: '#contact', stopNumber: '07', isCta: true },
  ],

  hero: {
    variant: 'story',
    stopLabel: 'Stop 00 · The departure',
    headline: 'Waypost',
    tagline: 'Neighborhood resilience, mapped stop by stop.',
    description:
      'An open civic platform linking solar micro-hubs, transit shelters, and real-time air telemetry across walkable city corridors.',
    primaryCta: { label: 'Explore Live Console', href: '#showcase' },
    secondaryCta: { label: 'Our Mission', href: '#about' },
    scrollHint: 'Scroll along the corridor',
    highlights: [
      { label: 'Active Corridors', value: '18' },
      { label: 'Median Response', value: '1.4s' },
      { label: 'Open Spec', value: 'MIT' },
    ],
  },

  about: {
    id: 'about',
    stopNumber: 1,
    eyebrow: 'Stop 01 · Why Waypost',
    title: 'Built for the last half-mile, not just the highway.',
    lede: 'Cities collect gigabytes of sensor data that never reach the street corner. Waypost turns neighborhood transit stops into transparent, solar-backed civic beacons.',
    visualLayout: 'image-right',
    points: [
      {
        title: 'Hyper-local telemetry',
        description:
          'Each shelter streams shade index, battery reserve, and shuttle arrival pulses directly to commuters and city planners.',
      },
      {
        title: 'Zero-lockup offline mode',
        description:
          'Edge nodes cache route bulletins locally so neighborhoods stay informed even during grid brownouts.',
      },
      {
        title: 'Community stewardship',
        description:
          'Residents and dispatchers share one transparent status ledger with verifiable maintenance receipts.',
      },
    ],
    cta: { label: 'See Core Capabilities', href: '#features' },
  },

  features: {
    id: 'features',
    stopNumber: 2,
    eyebrow: 'Stop 02 · Architecture',
    title: 'Six modular blocks from curb to cloud.',
    lede: 'Every layer is built on open web standards so hackathon teams and municipalities can deploy a corridor in an afternoon.',
    items: [
      {
        id: 'mesh-routing',
        title: 'Corridor Mesh Sync',
        description:
          'Lightweight LoRa + WebSocket state synchronization keeps stop displays aligned within two seconds.',
        tag: 'Edge · < 40KB',
        icon: 'radio',
      },
      {
        id: 'solar-budget',
        title: 'Solar Reserve Forecasting',
        description:
          'Predicts battery runway 48 hours ahead using local cloud-cover feeds and foot-traffic curves.',
        tag: 'Energy · ML',
        icon: 'zap',
      },
      {
        id: 'civic-ledger',
        title: 'Verified Field Receipts',
        description:
          'Timestamped citizen reports and technician sign-offs build public trust around every repair.',
        tag: 'Trust · Audit',
        icon: 'shield-check',
      },
      {
        id: 'wayfinder-ui',
        title: 'Accessible Wayfinding',
        description:
          'High-contrast typography, keyboard-first navigation, and reduced-motion fallbacks out of the box.',
        tag: 'WCAG AA',
        icon: 'compass',
      },
      {
        id: 'live-queries',
        title: 'Cached Query Pipeline',
        description:
          'Powered by TanStack React Query for instant optimistic updates and graceful stale-while-revalidate views.',
        tag: 'React Query',
        icon: 'activity',
      },
      {
        id: 'supabase-ready',
        title: 'Drop-In Postgres & Auth',
        description:
          'Ships in zero-backend demo mode and upgrades cleanly to Supabase Postgres, Auth, and Storage.',
        tag: 'Supabase Ready',
        icon: 'layers',
      },
    ],
  },

  stats: {
    id: 'stats',
    stopNumber: 3,
    eyebrow: 'Stop 03 · Measured Impact',
    title: 'Numbers from our 90-day pilot corridor.',
    lede: 'Simulated telemetry from three neighborhood loops demonstrates how readable street data changes daily commuter habits.',
    items: [
      {
        id: 'wait-drop',
        value: '34%',
        label: 'Shorter curb wait times',
        context: 'Across 14 instrumented neighborhood stops',
        delta: '-4.2 min avg',
      },
      {
        id: 'solar-uptime',
        value: '99.4%',
        label: 'Off-grid beacon uptime',
        context: 'Sustained through overcast winter weeks',
        delta: '+6.1% reserve',
      },
      {
        id: 'reports-resolved',
        value: '412',
        label: 'Field receipts closed',
        context: 'Verified by riders & local stewards',
        delta: '18h median fix',
      },
      {
        id: 'co2-offset',
        value: '12.8t',
        label: 'Estimated CO₂ avoided',
        context: 'Mode shift from solo errands to micro-transit',
        delta: 'Demo projection',
      },
    ],
  },

  showcase: {
    id: 'showcase',
    stopNumber: 4,
    eyebrow: 'Stop 04 · Live Operations Preview',
    title: 'One design system, from editorial story to operator dashboard.',
    lede: 'Switch corridor views or preview loading, empty, and error states to test how the component library handles real-world data conditions.',
    tabs: [
      {
        id: 'corridor-north',
        label: 'North Loop',
        summary: '6 solar shelters active · peak afternoon cadence',
        metrics: [
          { label: 'Grid Reserve', value: '86%', status: 'healthy' },
          { label: 'Active Shuttles', value: '12 / 12', status: 'healthy' },
          { label: 'Air Quality Index', value: '28 Good', status: 'info' },
        ],
        rows: [
          { id: 'N-01', corridor: 'Market & 4th Canopy', load: '72%', uptime: '99.8%', status: 'online' },
          { id: 'N-02', corridor: 'Civic Library Plaza', load: '54%', uptime: '99.5%', status: 'online' },
          { id: 'N-03', corridor: 'Riverwalk Crossing', load: '38%', uptime: '98.9%', status: 'online' },
        ],
      },
      {
        id: 'corridor-east',
        label: 'East Transit Hub',
        summary: 'High-volume commuter interchange · adaptive lighting enabled',
        metrics: [
          { label: 'Grid Reserve', value: '64%', status: 'warning' },
          { label: 'Active Shuttles', value: '9 / 10', status: 'healthy' },
          { label: 'Air Quality Index', value: '41 Moderate', status: 'warning' },
        ],
        rows: [
          { id: 'E-01', corridor: 'Foundry Rail Terminal', load: '89%', uptime: '99.2%', status: 'online' },
          { id: 'E-02', corridor: 'Community Clinic Stop', load: '61%', uptime: '99.7%', status: 'online' },
          { id: 'E-03', corridor: 'Botanical Annex', load: '19%', uptime: '97.4%', status: 'standby' },
        ],
      },
      {
        id: 'corridor-south',
        label: 'Campus & Makers',
        summary: 'University night-shuttle corridor · solar storage reserve',
        metrics: [
          { label: 'Grid Reserve', value: '93%', status: 'healthy' },
          { label: 'Active Shuttles', value: '7 / 7', status: 'healthy' },
          { label: 'Air Quality Index', value: '22 Good', status: 'info' },
        ],
        rows: [
          { id: 'S-01', corridor: 'Engineering Quad', load: '66%', uptime: '99.9%', status: 'online' },
          { id: 'S-02', corridor: 'Co-op Grocery Corner', load: '48%', uptime: '99.6%', status: 'online' },
          { id: 'S-03', corridor: 'South Pier Trailhead', load: '29%', uptime: '99.1%', status: 'online' },
        ],
      },
    ],
  },

  testimonials: {
    id: 'testimonials',
    stopNumber: 5,
    eyebrow: 'Stop 05 · Field Notes',
    title: 'Voices from the sidewalk, on the record.',
    lede: 'Designed as tactile transit receipts—pairing human quotes with clear verification metadata.',
    items: [
      {
        id: 'rec-1',
        author: 'Maya Chen',
        role: 'Daily Commuter',
        receiptCode: 'Receipt 0412',
        rating: 5,
        quote:
          'Knowing the exact shuttle arrival and shaded bench status at Market & 4th cut my morning sprint in half. The screen is effortless to read even in bright sun.',
        metaLeft: 'Corridor · North Loop',
        metaRight: 'Verified Rider',
      },
      {
        id: 'rec-2',
        author: 'Devon Okafor',
        role: 'Transit Lead',
        receiptCode: 'Receipt 0419',
        rating: 5,
        quote:
          'We adapted this entire Waypost UI shell during a 36-hour civic hackathon. Swapping tokens and copy took twenty minutes, leaving all our energy for the live sensor API.',
        metaLeft: 'Deployment · Pilot #3',
        metaRight: 'Maintainer Sign-off',
      },
      {
        id: 'rec-3',
        author: 'Priya Nair',
        role: 'Urban Planner',
        receiptCode: 'Receipt 0427',
        rating: 5,
        quote:
          'Most civic dashboards feel cold and intimidating. Framing metrics as numbered neighborhood stops got residents actually reading and reporting issues.',
        metaLeft: 'District · East Hub',
        metaRight: 'Public Record',
      },
    ],
  },

  cta: {
    id: 'cta',
    stopNumber: 6,
    eyebrow: 'Stop 06 · Next Departure',
    title: 'Ready to launch your next hackathon build?',
    emphasisLine: 'Clone the system, swap the config, ship before demo day.',
    description:
      'Every section, card, gauge, and theme preset is wired with strict TypeScript types and ready for Vercel + Supabase.',
    primaryCta: { label: 'Request Pilot Access', href: '#contact' },
    secondaryCta: { label: 'Inspect Component States', href: '#showcase' },
  },

  contact: {
    id: 'contact',
    stopNumber: 7,
    eyebrow: 'Stop 07 · Dispatch Desk',
    title: 'Reach the team or test a live form submission.',
    lede: 'Need a corridor kit for your city or campus? Send a note below—validation and feedback states work locally right out of the box.',
    location: 'Operating across 14 neighborhood stops · Demo District',
    phone: '+1 (555) 014-2090',
    email: 'hello@waypost.example',
    hoursLabel: 'Dispatch Hours',
    hoursValue: 'Mon – Sat • 6am – 10pm   Sun • 8am – 8pm',
    formTitle: 'Send a dispatch note',
    formSubtitle: 'Select your role and describe your corridor or project idea.',
    roles: ['Hackathon Builder', 'City / Campus Partner', 'Community Steward'],
    demoNotice:
      'Demo mode active: submissions are validated and confirmed locally without sending data to a backend server.',
  },

  footer: {
    brandTitle: 'Waypost',
    brandTagline: 'Neighborhood energy, transit, and civic resilience — mapped stop by stop.',
    columns: [
      {
        title: 'Wayfinding',
        links: [
          { label: 'Stop 01 · Mission', href: '#about' },
          { label: 'Stop 02 · System', href: '#features' },
          { label: 'Stop 03 · Impact', href: '#stats' },
          { label: 'Stop 04 · Live Console', href: '#showcase' },
        ],
      },
      {
        title: 'Dispatch',
        lines: [
          'hello@waypost.example',
          '+1 (555) 014-2090',
          'Mon – Sat • 6am – 10pm',
          'Sun • 8am – 8pm',
        ],
      },
    ],
    copyright: '© 2026 Waypost Design System Template. Open-source hackathon starter.',
  },
};

