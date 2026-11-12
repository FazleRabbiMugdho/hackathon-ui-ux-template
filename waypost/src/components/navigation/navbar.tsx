'use client';

import { useState } from 'react';
import { Moon, Palette, Sun } from 'lucide-react';
import type { NavItem } from '@/config/types';
import { useTheme } from '@/design-system/themeProvider';
import { cn } from '@/lib/utils';
import { BrandMark } from '@/components/visuals/waypost-illustrations';
import { MobileDrawer } from './mobile-drawer';

export interface NavbarProps {
  projectName: string;
  navItems: NavItem[];
  activeId: string;
  showPresetSwitcher?: boolean;
  onNavigateHref?: (href: string) => void;
}

/**
 * Reference-accurate sticky top header:
 * - Compact brand silhouette + tight-tracked wordmark
 * - Pill nav links with active bottom accent (`inset 0 -3px 0`) + crimson CTA pill
 * - Circular 42px theme toggle + optional preset switcher + mobile Menu trigger
 */
export function Navbar({
  projectName,
  navItems,
  activeId,
  showPresetSwitcher = true,
  onNavigateHref,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [presetMenuOpen, setPresetMenuOpen] = useState(false);
  const { mode, toggleMode, preset, setPresetId, availablePresets } = useTheme();

  const handleLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateHref && href.startsWith('#')) {
      e.preventDefault();
      onNavigateHref(href);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--ws-hover-tint)] bg-[var(--ws-header-bg)] transition-colors">
        <div className="flex w-full items-center justify-between gap-2 px-[clamp(18px,4vw,48px)] py-3">
          <a
            href="#home"
            onClick={handleLinkClick('#home')}
            className="relative z-10 flex shrink-0 items-center gap-2.5 text-[1.4rem] md:text-[1.7rem] font-extrabold leading-none tracking-[-0.03em] text-[var(--ws-ink)] no-underline whitespace-nowrap"
          >
            <BrandMark className="w-[34px] md:w-[42px] text-[var(--ws-accent)]" />
            <span>{projectName}</span>
          </a>

          <nav aria-label="Main navigation" className="hidden lg:ml-auto lg:block">
            <ul className="flex items-center gap-1.5">
              {navItems.map((item) => {
                const targetId = item.href.replace(/^#/, '');
                const isActive = activeId === targetId;

                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={handleLinkClick(item.href)}
                      className={cn(
                        'block whitespace-nowrap rounded-full px-4 py-[9px] text-[0.95rem] font-bold transition-[background-color,color] duration-200 no-underline',
                        item.isCta
                          ? 'bg-[var(--ws-accent)] text-[var(--ws-accent-contrast)] hover:bg-[var(--ws-accent-hover)]'
                          : 'text-[var(--ws-ink)] hover:bg-[var(--ws-hover-tint)]',
                        !item.isCta &&
                          isActive &&
                          'shadow-[inset_0_-3px_0_var(--ws-accent)]',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 ml-auto flex items-center gap-2.5 lg:ml-4">
            {showPresetSwitcher && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPresetMenuOpen((v) => !v)}
                  aria-label="Switch theme preset"
                  aria-expanded={presetMenuOpen}
                  title={`Theme preset: ${preset.name}`}
                  className="hidden sm:grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-full border-2 border-[var(--ws-ink)] text-[var(--ws-ink)] transition-colors hover:bg-[var(--ws-ink)] hover:text-[var(--ws-bg)]"
                >
                  <Palette className="h-[18px] w-[18px]" aria-hidden="true" />
                </button>

                {presetMenuOpen && (
                  <div
                    role="menu"
                    aria-label="Theme presets"
                    className="absolute right-0 mt-2 w-64 rounded-2xl border-2 border-[var(--ws-ink-secondary)] bg-[var(--ws-surface)] p-2 shadow-xl"
                  >
                    <p className="ws-font-mono px-3 py-1.5 text-[11px] uppercase tracking-wider text-[var(--ws-ink-secondary)]">
                      Hackathon Presets
                    </p>
                    {availablePresets.map((item) => {
                      const selected = item.id === preset.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="menuitemradio"
                          aria-checked={selected}
                          onClick={() => {
                            setPresetId(item.id);
                            setPresetMenuOpen(false);
                          }}
                          className={cn(
                            'flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold transition-colors',
                            selected
                              ? 'bg-[var(--ws-accent)] text-[var(--ws-accent-contrast)]'
                              : 'text-[var(--ws-ink)] hover:bg-[var(--ws-hover-tint)]',
                          )}
                        >
                          <span>{item.name}</span>
                          <span
                            className="h-3 w-3 rounded-full border border-current"
                            style={{ backgroundColor: item.light.accent }}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={toggleMode}
              aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={mode === 'dark'}
              className="grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-full border-2 border-[var(--ws-ink)] text-[var(--ws-ink)] transition-colors hover:bg-[var(--ws-ink)] hover:text-[var(--ws-bg)]"
            >
              {mode === 'dark' ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="cursor-pointer rounded-full border-2 border-[var(--ws-ink)] px-[18px] py-2 text-sm font-bold text-[var(--ws-ink)] transition-colors hover:bg-[var(--ws-ink)] hover:text-[var(--ws-bg)] lg:hidden"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={navItems}
        activeId={activeId}
        showPresetSwitcher={showPresetSwitcher}
        onNavigateHref={onNavigateHref}
      />
    </>
  );
}
