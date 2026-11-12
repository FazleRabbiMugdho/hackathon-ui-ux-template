'use client';

import { useEffect } from 'react';
import type { NavItem } from '@/config/types';
import { useTheme } from '@/design-system/themeProvider';
import { cn } from '@/lib/utils';

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeId: string;
  showPresetSwitcher?: boolean;
  onNavigateHref?: (href: string) => void;
}

/**
 * Full-screen slide-down editorial mobile navigation drawer inspired by Tuktuk.
 * Locks body scrolling while open and closes cleanly on Escape or link click.
 */
export function MobileDrawer({
  open,
  onClose,
  navItems,
  activeId,
  showPresetSwitcher = true,
  onNavigateHref,
}: MobileDrawerProps) {
  const { preset, setPresetId, availablePresets } = useTheme();

  useEffect(() => {
    if (!open) {
      document.body.classList.remove('ws-scroll-locked');
      return;
    }

    document.body.classList.add('ws-scroll-locked');
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('ws-scroll-locked');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-navigation-drawer"
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-40 flex flex-col justify-between bg-[var(--ws-bg)] px-6 pt-24 pb-10 transition-transform duration-700 ease-[var(--ws-ease-drawer)] lg:hidden',
        open ? 'pointer-events-auto translate-y-0 visible' : 'pointer-events-none -translate-y-full invisible',
      )}
    >
      <nav aria-label="Mobile navigation">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const targetId = item.href.replace(/^#/, '');
            const isActive = activeId === targetId;

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    onClose();
                    if (onNavigateHref && item.href.startsWith('#')) {
                      e.preventDefault();
                      onNavigateHref(item.href);
                    }
                  }}
                  className={cn(
                    'flex items-baseline gap-3 py-1 text-[clamp(2.2rem,10vw,3.8rem)] font-extrabold leading-[1.05] tracking-[-0.03em] no-underline transition-colors',
                    item.isCta
                      ? 'text-[var(--ws-accent-text)]'
                      : isActive
                        ? 'text-[var(--ws-accent-text)]'
                        : 'text-[var(--ws-ink)]',
                  )}
                >
                  <span className="ws-font-mono text-sm font-medium opacity-60">
                    {item.stopNumber}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {showPresetSwitcher && (
        <div className="border-t-2 border-dashed border-[var(--ws-border-dashed)] pt-5">
          <p className="ws-font-mono mb-3 text-xs uppercase tracking-wider text-[var(--ws-ink-secondary)]">
            Theme Preset
          </p>
          <div className="flex flex-wrap gap-2">
            {availablePresets.map((item) => {
              const selected = item.id === preset.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setPresetId(item.id)}
                  className={cn(
                    'cursor-pointer rounded-full border-2 px-3.5 py-1.5 text-xs font-bold transition-colors',
                    selected
                      ? 'border-[var(--ws-accent)] bg-[var(--ws-accent)] text-[var(--ws-accent-contrast)]'
                      : 'border-[var(--ws-ink)] text-[var(--ws-ink)]',
                  )}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
