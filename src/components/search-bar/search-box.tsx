import { ChangeEvent, ComponentProps, KeyboardEvent, useState } from 'react';
import loupe from './assets/search-icon.svg';
import { QUERY_KEYS } from '../../constants/query-keys';
import { FIRST_PAGE, PAGE_OFFSET } from '../cards-list/cards-list.constants';
import Image from 'next/image';
import { useQueryState } from '@/hooks/use-query-state';
import { setLoading } from '@/store/features';
import { useAppDispatch } from '@/store/store.hooks';

import styles from './search-box.module.scss';

export const SEARCH_PLACEHOLDER = 'Search';

export function SearchBox({ className = '' }: ComponentProps<'div'>) {
  const { searchParams, setQueryValue } = useQueryState();
  const dispatch = useAppDispatch();
  const initSearchTerm = searchParams?.[QUERY_KEYS.NAME] ?? '';
  const [term, setTerm] = useState(initSearchTerm as string);

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setTerm(value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  // setup current page on the first page when the search term is changed
  const handleSubmit = () => {
    dispatch(setLoading(true));

    const firstPage = (FIRST_PAGE + PAGE_OFFSET).toString();
    const newQueries = [
      { key: QUERY_KEYS.PAGE, value: firstPage },
      { key: QUERY_KEYS.NAME, value: term.trim() },
    ];

    setQueryValue(newQueries);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.form}>
        <input
          value={term}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          type="text"
          className={styles.input}
          placeholder={SEARCH_PLACEHOLDER}
        />
        <button
          className={styles.button}
          aria-label="Search"
          type="submit"
          onClick={handleSubmit}
        >
          <Image src={loupe} alt="loupe icon" width={40} height={40} />
        </button>
      </div>
    </div>
  );
}
