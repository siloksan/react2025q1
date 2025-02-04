import React from 'react';
import ErrorBoundary from '../../shared/errorBoundary/ErrorBoundary';
import { ErrorButton } from './components/error-button/error-button';
import { Header } from '../../components/header/header';
import { CardsList } from '../../components/cards-list/cards-list';

import styles from './main.module.scss';
import StorageService from '../../api/utils/storage-service';

export default class Main extends React.Component {
  private readonly storageService = new StorageService('searchTerm');

  public readonly state = {
    searchTerm: this.storageService.getData() ?? '',
  };

  public handleSearch = (name: string) => {
    this.setState({ searchTerm: name });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <Header updateData={this.handleSearch} searchTerm={searchTerm} />
        <main className={styles.main}>
          <ErrorBoundary>
            <h1 className={styles.title}>Star Ships</h1>
            <CardsList searchTerm={searchTerm} />
          </ErrorBoundary>
          <ErrorButton />
        </main>
      </div>
    );
  }
}
