import { Header } from '../components/header/header';
import { useThemeContext } from '../context/theme.context';
import { Main } from '../pages/main/main';

import styles from './layout.module.scss';

export default function Layout() {
  const { theme } = useThemeContext();

  return (
    <div data-theme={theme} className={styles.layout}>
      <Header />
      <Main />
    </div>
  );
}
