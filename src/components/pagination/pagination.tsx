import { QUERY_KEYS } from '../../constants/query-keys';
import { useQueryState } from '../../hooks/use-query-state';
import { Button } from '../../shared/button/button';
import { EMPTY_BUTTON_VALUE, getButtonsNameArray } from './pagination.utils';

import styles from './pagination.module.scss';

export const EMPTY_BUTTON_VIEW = '...';

export interface PropsPagination {
  readonly totalPages: number;
  readonly currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PropsPagination) {
  const { setQueryValue } = useQueryState();
  const buttonClass = styles.button;
  const { disabled } = styles;
  const { current } = styles;

  if (totalPages < 2) {
    return null;
  }

  function handleClick(pageNumber: number) {
    const newQueries = [{ key: QUERY_KEYS.PAGE, value: pageNumber.toString() }];
    setQueryValue(newQueries);
  }

  const prevBtnDisabled = currentPage === 1;
  const nextBtnDisabled = currentPage === totalPages;
  const PAGINATION_ARRAY = getButtonsNameArray(currentPage, totalPages);

  let prevBtnClassName = buttonClass;
  let nextBtnClassName = buttonClass;

  if (currentPage === 1) {
    prevBtnClassName += ` ${disabled}`;
  }

  if (totalPages === currentPage) {
    nextBtnClassName += ` ${disabled}`;
  }

  const listButtons = PAGINATION_ARRAY.map((pageNumber, idx) => {
    let btnView: string | number = pageNumber;

    let className = buttonClass;
    const isCurrentButton = pageNumber === currentPage;
    const isDisabled =
      EMPTY_BUTTON_VALUE === pageNumber || pageNumber === currentPage;

    if (isCurrentButton) {
      className += ` ${current}`;
    }

    if (isDisabled) {
      className += ` ${disabled}`;
    }

    if (pageNumber === EMPTY_BUTTON_VALUE) {
      btnView = EMPTY_BUTTON_VIEW;
    }

    return (
      <Button
        className={className}
        type="button"
        key={`${pageNumber}-${idx}`}
        onClick={() => handleClick(pageNumber)}
        data-testid="pagination-button"
        disabled={isDisabled}
      >
        {btnView}
      </Button>
    );
  });

  return (
    <div className={styles.container} data-testid="pagination">
      <Button
        className={prevBtnClassName}
        type="button"
        onClick={() => handleClick(currentPage - 1)}
        disabled={prevBtnDisabled}
      >
        prev
      </Button>
      {listButtons}
      <Button
        className={nextBtnClassName}
        type="button"
        onClick={() => handleClick(currentPage + 1)}
        disabled={nextBtnDisabled}
      >
        next
      </Button>
    </div>
  );
}
