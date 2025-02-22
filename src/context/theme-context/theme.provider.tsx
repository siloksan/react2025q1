'use client';

import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { Themes } from './theme.constants';
import { ThemeContext } from './theme.context';
import { CLIENT_ROUTES } from '@/api/routes';
import { RequestMethod } from '@/api/api-constants';

interface Props extends PropsWithChildren {
  theme: Themes;
}

export function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState<Themes>(props.theme);

  const toggleTheme = useCallback(() => {
    const selectedTheme = theme === Themes.light ? Themes.dark : Themes.light;
    setTheme(selectedTheme);

    fetch(CLIENT_ROUTES.SET_THEME, {
      method: RequestMethod.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: selectedTheme }),
    });
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value} {...props} />;
}
