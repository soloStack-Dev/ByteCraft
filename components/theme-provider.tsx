/**
 * theme-provider.tsx
 * ------------------------------------------------------------------
 * Light/Dark theme switching for the entire site.
 *
 * How it works:
 *   1. On mount we resolve the initial theme (stored preference, else
 *      the OS preference, else dark).
 *   2. Whenever `theme` changes we toggle the `.dark` / `.light` class
 *      on <html>. All colours are CSS variables keyed off those classes
 *      (see app/globals.css), so one class switch re-themes everything.
 *   3. The choice is persisted to localStorage so it survives reloads.
 *
 * A tiny inline script in app/layout.tsx applies the theme before the
 * first paint to avoid a flash of the wrong theme.
 * ------------------------------------------------------------------
 */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/** The two supported themes. */
export type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

// Context is isolated in this module; consumers get it via useTheme().
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/** localStorage key used to remember the user's choice. */
const STORAGE_KEY = "bytecraft-theme";

/**
 * Decide the starting theme.
 * Priority: saved preference → system preference → dark.
 */
function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"; // SSR safe default
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start at "dark" during SSR; corrected to the real value on mount.
  const [theme, setThemeState] = useState<Theme>("dark");

  // Resolve the actual initial theme once the browser is available.
  // Deferred out of the effect body to satisfy React's set-state-in-effect
  // rule. The inline script in layout.tsx already applied the correct class
  // before first paint, so this only syncs React state to it.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setThemeState(resolveInitialTheme()));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Apply the class to <html> and persist the choice.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable (private mode, etc.) – ignored */
    }
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    setTheme: setThemeState,
    toggleTheme: () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Hook for reading/toggling the theme within a ThemeProvider. */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
