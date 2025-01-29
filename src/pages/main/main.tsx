import React from 'react';
import { ErrorButton } from './components/error-button/error-button';
import { Header } from '../../components/header/header';

import styles from './main.module.scss';
import { CardsList } from '../../components/cards-list/cards-list';
import ErrorBoundary from '../../shared/errorBoundary/ErrorBoundary';

export default class Main extends React.Component {
  public readonly state = {
    searchTerm: '',
  };

  public handleSearch = (name: string) => {
    this.setState({ searchTerm: name });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <Header updateData={this.handleSearch} />
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
}
