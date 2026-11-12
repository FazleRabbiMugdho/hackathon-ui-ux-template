'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PALETTE_TO_CSS_VAR, THEME_PRESETS, waypostWarm } from './themes';
import type { PaletteTokens, ThemeMode, ThemePreset } from './tokens';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  presetId: string;
  setPresetId: (id: string) => void;
  preset: ThemePreset;
  availablePresets: ThemePreset[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const MODE_STORAGE_KEY = 'waystop-theme-mode';
const PRESET_STORAGE_KEY = 'waystop-theme-preset';

function readStoredMode(defaultMode: ThemeMode | 'system'): ThemeMode {
  if (typeof window === 'undefined') {
    return defaultMode === 'dark' ? 'dark' : 'light';
  }
  try {
    const saved = window.localStorage.getItem(MODE_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Ignore storage errors in restricted contexts
  }
  if (defaultMode === 'system') {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return defaultMode;
}

function readStoredPreset(defaultPresetId: string): string {
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(PRESET_STORAGE_KEY);
      if (saved && THEME_PRESETS[saved]) return saved;
    } catch {
      // Ignore storage errors
    }
  }
  return THEME_PRESETS[defaultPresetId] ? defaultPresetId : waypostWarm.id;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode | 'system';
  defaultPresetId?: string;
}

/**
 * Provides light/dark mode and theme preset switching across Next.js App Router,
 * synchronizing CSS custom properties onto `document.documentElement`.
 */
export function ThemeProvider({
  children,
  defaultMode = 'light',
  defaultPresetId = waypostWarm.id,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => (defaultMode === 'dark' ? 'dark' : 'light'));
  const [presetId, setPresetIdState] = useState<string>(() =>
    THEME_PRESETS[defaultPresetId] ? defaultPresetId : waypostWarm.id,
  );

  // Sync persisted preferences after hydration to avoid SSR/client mismatch
  useEffect(() => {
    setModeState(readStoredMode(defaultMode));
    setPresetIdState(readStoredPreset(defaultPresetId));
  }, [defaultMode, defaultPresetId]);

  const preset = THEME_PRESETS[presetId] ?? waypostWarm;

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode, setMode]);

  const setPresetId = useCallback((id: string) => {
    if (!THEME_PRESETS[id]) return;
    setPresetIdState(id);
    try {
      window.localStorage.setItem(PRESET_STORAGE_KEY, id);
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    root.style.colorScheme = mode;

    const palette: PaletteTokens = mode === 'dark' ? preset.dark : preset.light;
    (Object.keys(PALETTE_TO_CSS_VAR) as Array<keyof PaletteTokens>).forEach((key) => {
      root.style.setProperty(PALETTE_TO_CSS_VAR[key], palette[key]);
    });
  }, [mode, preset]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode,
      presetId: preset.id,
      setPresetId,
      preset,
      availablePresets: Object.values(THEME_PRESETS),
    }),
    [mode, setMode, toggleMode, preset, setPresetId],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Access current theme mode, active preset, and mutators inside ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }
  return ctx;
}

