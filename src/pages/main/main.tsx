import { useState } from 'react';
import ErrorBoundary from '../../shared/errorBoundary/ErrorBoundary';
import { ErrorButton } from './components/error-button/error-button';
import { Header } from '../../components/header/header';
import { CardsList } from '../../components/cards-list/cards-list';

import styles from './main.module.scss';

export function Main() {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(name: string) {
    setSearchTerm(name);
  }

  return (
    <div>
      <Header updateData={handleSearch} />
      <main className={styles.main}>
        <ErrorBoundary>
          <h1 className={styles.title}>Books Beyond</h1>
          <CardsList searchTerm={searchTerm} />
        </ErrorBoundary>
        <ErrorButton />
      </main>
    </div>
  );
}
