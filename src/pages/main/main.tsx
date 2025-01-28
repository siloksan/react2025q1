import React from 'react';
import { ErrorButton } from './components/error-button/error-button';
import { Header } from '../../components/header/header';
import { getSpacecrafts } from './main.get-data';
import { SpacecraftsResponse } from '../../api/types';

import styles from './main.module.scss';
import { CardsList } from '../../components/cards-list/cards-list';

interface State {
  data: SpacecraftsResponse | null;
  error: string | null;
  loading: boolean;
}

type Props = object;

export default class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      error: null,
      loading: false,
    };
  }

  public updateData = async (name: string) => {
    this.setState({ data: null, loading: true });

    try {
      const data = await getSpacecrafts({
        name: name,
      });

      this.setState({ data });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { data, error, loading } = this.state;

    if (error) {
      throw new Error(error);
    }
    return (
      <div>
        <Header updateData={this.updateData} />
        <main className={styles.main}>
          <h1 className={styles.title}>Books Beyond</h1>
          <CardsList cards={data} loading={loading} />
          <ErrorButton />
        </main>
      </div>
    );
  }
}
