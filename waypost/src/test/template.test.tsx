import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach } from 'vitest';
import { Providers } from '@/components/providers';
import { HomePage } from '@/components/home-page';
import { HeroSection } from '@/components/sections/hero-section';
import { siteConfig } from '@/config/site.config';

function renderWithProviders(ui: React.ReactElement) {
  return render(<Providers>{ui}</Providers>);
}

describe('Waypost Hackathon Template', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('ws-scroll-locked');
  });

  it('renders all 10 required sections from centralized siteConfig', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Waypost/i })).toBeInTheDocument();
    expect(screen.getByText(siteConfig.about.title)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.features.title)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.stats.title)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.showcase.title)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.testimonials.title)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.cta.title)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.contact.title)).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('toggles light and dark theme mode cleanly', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);

    const toggleBtn = screen.getByRole('button', { name: /Switch to dark theme/i });
    await user.click(toggleBtn);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByRole('button', { name: /Switch to light theme/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('switches hackathon theme presets and updates CSS variables', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);

    await user.click(screen.getByRole('button', { name: /Switch theme preset/i }));
    await user.click(screen.getByRole('menuitemradio', { name: /Civic Emerald/i }));

    expect(document.documentElement.style.getPropertyValue('--ws-accent')).toBe('#1b7a4b');
  });

  it('opens and closes the mobile navigation drawer and cleans up scroll lock', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);

    const openBtn = screen.getByRole('button', { name: /Open navigation menu/i });
    await user.click(openBtn);
    expect(document.body.classList.contains('ws-scroll-locked')).toBe(true);

    await user.keyboard('{Escape}');
    expect(document.body.classList.contains('ws-scroll-locked')).toBe(false);
  });

  it('switches showcase tabs and previews loading, empty, and error states', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);

    await user.click(screen.getByRole('tab', { name: /East Transit Hub/i }));
    expect(screen.getByText(/Foundry Rail Terminal/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^loading$/i }));
    expect(screen.getByText(/Syncing corridor telemetry/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^empty$/i }));
    expect(screen.getByText(/No stops matched this view/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Restore Live Corridor/i }));
    expect(screen.getByText(/Foundry Rail Terminal/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^error$/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/Unable to reach corridor feed/i);
    await user.click(screen.getByRole('button', { name: /Retry Connection/i }));
    expect(screen.getByText(/Foundry Rail Terminal/i)).toBeInTheDocument();
  });

  it('validates contact form fields and shows local demo receipt on valid submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);

    await user.click(screen.getByRole('button', { name: /Send Dispatch Note/i }));
    expect(screen.getByText(/Please enter at least 2 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Please share a brief note/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Your name/i), 'Ada Lovelace');
    await user.type(screen.getByLabelText(/Email address/i), 'ada@waypost.example');
    await user.type(
      screen.getByLabelText(/Project or corridor notes/i),
      'Deploying 4 solar transit shelters for civic hack.',
    );

    await user.click(screen.getByRole('button', { name: /Send Dispatch Note/i }));

    await waitFor(() => {
      expect(screen.getByText(/Demo receipt #WP-/i)).toBeInTheDocument();
    });
  });

  it('renders HeroSection in split variant when configured', () => {
    renderWithProviders(<HeroSection config={siteConfig.hero} variant="split" />);
    expect(screen.getByRole('heading', { level: 1, name: /Waypost/i })).toBeInTheDocument();
    expect(screen.getByText(siteConfig.hero.tagline)).toBeInTheDocument();
  });

  it('mounts reference hero vehicle, SVG route layer, and 1:1 stop cards and pins', () => {
    const { container } = renderWithProviders(<HomePage />);

    expect(container.querySelector('#ws-stage')).toBeInTheDocument();
    expect(container.querySelector('#ws-hero-vehicle')).toBeInTheDocument();
    expect(container.querySelector('#ws-route')).toBeInTheDocument();
    expect(container.querySelector('#ws-trail')).toBeInTheDocument();
    expect(container.querySelector('#ws-car')).toBeInTheDocument();

    const stopCards = container.querySelectorAll('#ws-map [data-card="true"]');
    const stopPins = container.querySelectorAll('#ws-map [data-pin="true"]');
    const stopTiles = container.querySelectorAll('#ws-map [data-tile="true"]');
    expect(stopCards.length).toBe(7);
    expect(stopPins.length).toBe(7);
    expect(stopCards.length).toBe(stopPins.length);
    expect(stopTiles.length).toBe(7);
    expect(container.querySelectorAll('#ws-map .ws-stp-l').length).toBe(4);
    expect(container.querySelectorAll('#ws-map .ws-stp-r').length).toBe(3);
    expect(container.querySelectorAll('#ws-map .ws-stp-center').length).toBe(0);
    expect(container.querySelectorAll('#ws-map .ws-stp-bk').length).toBe(0);
  });

  it('reveals JourneyGauge stop preview tooltip on dot hover and does not render preloader curtain', async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<HomePage />);

    expect(container.querySelector('#ws-preloader')).not.toBeInTheDocument();

    const gauge = screen.getByRole('complementary', { name: /Journey progress/i });
    const tip = container.querySelector('#ws-sp-tip');
    expect(gauge).toBeInTheDocument();
    expect(tip).toBeInTheDocument();

    const thirdStopDot = screen.getByRole('link', { name: /03 Impact/i });
    await user.hover(thirdStopDot);
    expect(tip).toHaveClass('hv');
    expect(tip).toHaveTextContent(/03 · Impact/i);

    await user.unhover(thirdStopDot);
    expect(tip).not.toHaveClass('hv');
  });
});

