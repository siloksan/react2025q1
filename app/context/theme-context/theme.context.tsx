import { createContext, useContext } from 'react';
import { Themes } from './theme.constants';

interface ThemeContextType {
  theme: Themes;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useThemContext must be used within ThemeProvider!');
  return context;
}
