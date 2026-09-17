'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/** Keep in sync with the pre-paint theme script in app/layout.tsx. */
const STORAGE_KEY = 'theme';

function readStoredTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    // localStorage can throw in private/blocked-storage modes.
    return 'dark';
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Adopt whatever the pre-paint script already resolved, so state matches the DOM.
  useEffect(() => {
    setTheme(readStoredTheme());
    setMounted(true);
  }, []);

  // Gated on `mounted` so the initial default can't clobber a saved choice.
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Persisting the preference is best-effort.
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Always render children: returning null here blanked the entire server-rendered
  // page, so crawlers and link previews saw an empty document.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
