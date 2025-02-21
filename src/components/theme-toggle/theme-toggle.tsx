'use client';

import { useThemeContext } from '@/context/theme-context/theme.context';
import { Themes } from '@/context/theme-context/theme.constants';
import { WithTestId } from '../../types';

import styles from './theme-toggle.module.scss';

export function ThemeToggle({ testid }: WithTestId) {
  const { theme, toggleTheme } = useThemeContext();

  const isDark = theme === Themes.dark;

  return (
    <div className={styles.container} data-testid={testid}>
      Light
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          id="themeToggle"
          onChange={toggleTheme}
          checked={isDark}
        />
        <label className={styles.label} htmlFor="themeToggle">
          <div className={styles.ball} />
        </label>
      </div>
      Dark
    </div>
  );
}
