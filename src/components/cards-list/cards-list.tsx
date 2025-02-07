import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { SpacecraftsResponse } from '../../api/types';
import { Loader } from '../../shared/loader/loader';
import { Card } from '../card/card';
import { getSpacecrafts } from './cards-list.get-data';
import { useQueryState } from '../../hooks/use-query-state';
import { QUERY_KEYS } from '../../constants/query-keys';
import { PAGE_OFFSET } from './cards-list.constants';

import styles from './cards-list.module.scss';

interface Props extends ComponentProps<'ul'> {
  readonly data: SpacecraftsResponse | null;
  readonly setData: (data: SpacecraftsResponse | null) => void;
}

export function CardsList({ data, setData, className = '' }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { searchParams } = useQueryState();
  const searchTerm = searchParams.get(QUERY_KEYS.NAME) ?? '';
  const pageNumber =
    Number(searchParams.get(QUERY_KEYS.PAGE) ?? 1) - PAGE_OFFSET;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getSpacecrafts({
          name: searchTerm,
          pageNumber: Number(pageNumber),
        });

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
  }, [searchTerm, pageNumber]);

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

  return <ul className={`${styles.list} ${className}`}>{renderList()}</ul>;
}
