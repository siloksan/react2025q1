import React, { ChangeEvent, ComponentProps, useState } from 'react';
import loupe from './assets/search-icon.svg';
import { LOCALE_STORAGE_KEYS, useStorage } from '../../hooks';

import styles from './search-box.module.scss';

interface Props extends ComponentProps<'div'> {
  readonly updateData: (name: string) => void;
}

export function SearchBox({ updateData, className = '' }: Props) {
  const { getValue, setValue } = useStorage();
  const [searchTerm, setSearchTerm] = useState(getSearchName);

  function getSearchName() {
    return getValue(LOCALE_STORAGE_KEYS.SEARCH_TERM) ?? '';
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();
    setSearchTerm(value);
    setValue(LOCALE_STORAGE_KEYS.SEARCH_TERM, value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    updateData(searchTerm);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.form}>
        <input
          value={searchTerm}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          type="text"
          className={styles.input}
          placeholder="Search"
        />
        <button
          className={styles.button}
          aria-label="Search"
          type="submit"
          onClick={handleSubmit}
        >
          <img src={loupe} alt="loupe icon" />
        </button>
      </div>
    </div>
  );
}
