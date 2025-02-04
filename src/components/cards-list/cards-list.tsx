import { Component } from 'react';
import { SpacecraftsResponse } from '../../api/types';
import Loader from '../../shared/loader/loader';
import Card from '../card/card';

import styles from './cards-list.module.scss';
import { getSpacecrafts } from './cards-list.get-data';

interface Props {
  searchTerm: string;
}

interface State {
  data: SpacecraftsResponse | null;
  loading: boolean;
  error: string | null;
}

export class CardsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.updateData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.updateData(this.props.searchTerm);
    }
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

    const renderList = () => {
      if (loading) {
        return <Loader />;
      }

      if (!data || data.spacecrafts.length === 0) {
        return <h1 className={styles.not_found}>No spacecrafts found</h1>;
      }

      return data.spacecrafts.map((card) => {
        return <Card cardInfo={card} key={card.uid} />;
      });
    };

    return <ul className={styles.list}>{renderList()}</ul>;
  }
}
