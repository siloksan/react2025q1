import { Component } from 'react';
import { SpacecraftsResponse } from '../../api/types';
import Loader from '../../shared/loader/loader';
import Card from '../card/card';

import styles from './cards-list.module.scss';

interface Props {
  cards: SpacecraftsResponse | null;
  loading: boolean;
}

export class CardsList extends Component<Props> {
  render() {
    const { cards, loading } = this.props;

    const renderList = () => {
      if (loading) {
        return <Loader />;
      }

      if (!cards || cards.spacecrafts.length === 0) {
        return <h1 className={styles.not_found}>No spacecrafts found</h1>;
      }

      return cards.spacecrafts.map((card) => {
        return <Card cardInfo={card} key={card.uid} />;
      });
    };

    return <ul className={styles.list}>{renderList()}</ul>;
  }
}
