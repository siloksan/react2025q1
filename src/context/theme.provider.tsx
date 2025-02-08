import { PropsWithChildren, useMemo, useState } from 'react';
import { useStorage } from '../hooks';
import { THEME_LOCALSTORAGE_QEY, Themes } from './theme.constants';
import { ThemeContext } from './theme.context';

export function ThemeProvider({ children }: PropsWithChildren) {
  const { getValueFromStorage, setValueInStorage } = useStorage();
  const initialTheme =
    getValueFromStorage(THEME_LOCALSTORAGE_QEY) ?? Themes.light;
  const [theme, setTheme] = useState<Themes>(initialTheme as Themes);

  const toggleTheme = () => {
    const selectedTheme = theme === Themes.light ? Themes.dark : Themes.light;
    setTheme(selectedTheme);
    setValueInStorage(THEME_LOCALSTORAGE_QEY, selectedTheme);
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
