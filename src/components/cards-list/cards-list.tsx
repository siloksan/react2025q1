import { ComponentProps, useCallback, useEffect } from 'react';
import { Loader } from '../shared/loader/loader';
import { Card } from '../card/card';
import { useQueryState } from '../../hooks/use-query-state';
import { QUERY_KEYS } from '../../constants/query-keys';
import { FIRST_PAGE, PAGE_OFFSET } from './cards-list.constants';
import { useGetCardsQuery } from '../../api/api-root';

import styles from './cards-list.module.scss';
import { setCardsList } from '../../store/features';
import { useDispatch } from 'react-redux';

export function CardsList({ className = '' }: ComponentProps<'ul'>) {
  const { searchParams } = useQueryState();
  const dispatch = useDispatch();
  const searchTerm = searchParams.get(QUERY_KEYS.NAME) ?? '';
  const pageNumber =
    Number(searchParams.get(QUERY_KEYS.PAGE) ?? FIRST_PAGE) - PAGE_OFFSET;

  const { data, isLoading, isError, error } = useGetCardsQuery({
    name: searchTerm,
    pageNumber,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCardsList(data));
    }
  }, [data, dispatch]);

  if (isError) {
    throw error;
  }

  const renderList = useCallback(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (!data?.spacecrafts?.length) {
      return <h1 className={styles.not_found}>No spacecrafts found</h1>;
    }

    return data.spacecrafts.map((card) => (
      <Card cardInfo={card} key={card.uid} />
    ));
  }, [isLoading, data]);

  return <ul className={`${styles.list} ${className}`}>{renderList()}</ul>;
}
