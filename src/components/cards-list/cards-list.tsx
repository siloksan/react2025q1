import { useCallback, useEffect, useState } from 'react';
import { SpacecraftsResponse } from '../../api/types';
import { Loader } from '../../shared/loader/loader';
import { Card } from '../card/card';
import { getSpacecrafts } from './cards-list.get-data';
import { useQueryState } from '../../hooks/use-query-state';
import { QUERY_KEYS } from '../../constants/query-keys';

import styles from './cards-list.module.scss';

export function CardsList() {
  const [data, setData] = useState<SpacecraftsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { searchParams } = useQueryState();
  const searchTerm = searchParams.get(QUERY_KEYS.NAME) ?? '';

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getSpacecrafts({ name: searchTerm });

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [searchTerm]);

  if (error) {
    throw new Error(error);
  }

  const renderList = useCallback(() => {
    if (loading) {
      return <Loader />;
    }

    if (!data?.spacecrafts?.length) {
      return <h1 className={styles.not_found}>No spacecrafts found</h1>;
    }

    return data.spacecrafts.map((card) => (
      <Card cardInfo={card} key={card.uid} />
    ));
  }, [loading, data]);

  return <ul className={styles.list}>{renderList()}</ul>;
}
