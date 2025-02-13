'use server';
import { useThemeContext } from '@/context/theme.context';
import styles from './layout.module.scss';
import { Main } from '@/components/main/main';
import { Header } from '@/components/header/header';

export default function Layout() {
  const { theme } = useThemeContext();

  return (
    <div data-theme={theme} className={styles.layout}>
      <Header />
      <Main />
    </div>
  );
}
