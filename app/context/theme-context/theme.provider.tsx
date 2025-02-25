'use client';

import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { Themes } from './theme.constants';
import { ThemeContext } from './theme.context';
import { RequestMethod } from '~/service/api-constants';
import { useFetcher } from 'react-router';
import { CLIENT_ROUTES } from '~/service/routes';

interface Props extends PropsWithChildren {
  theme: Themes;
}

export function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState<Themes>(props.theme);
  const fetcher = useFetcher();

  const toggleTheme = useCallback(() => {
    const selectedTheme = theme === Themes.light ? Themes.dark : Themes.light;

    setTheme(selectedTheme);

    fetcher.submit(
      { theme: selectedTheme },
      { method: RequestMethod.POST, action: CLIENT_ROUTES.SET_THEME }
    );
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value} {...props} />;
}
