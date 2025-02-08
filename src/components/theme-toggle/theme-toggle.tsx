import { Themes } from '../../context/theme.constants';
import { useThemeContext } from '../../context/theme.context';

import styles from './theme-toggle.module.scss';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  const isDark = theme === Themes.dark;

  return (
    <div className={styles.container}>
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
