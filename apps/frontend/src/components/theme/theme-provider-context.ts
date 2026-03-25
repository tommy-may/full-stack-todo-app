import { createContext } from 'react';

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export type Theme = 'dark' | 'light' | 'system';

export const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);
