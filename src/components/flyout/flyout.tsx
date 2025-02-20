import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../shared/button/button';
import { RootState } from '../../store/store';
import { removeAll } from '../../store/features';
import { createCsv } from '../../utils';

import styles from './flyout.module.scss';

export function Flyout() {
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.value
  );
  const dispatch = useDispatch();
  const numberOfCards = selectedCards.length;
  const isShown = numberOfCards > 0;

  if (!isShown) return null;

  const unselectAll = () => {
    dispatch(removeAll());
  };

  const downloadUrl = createCsv(selectedCards);

  return (
    <div className={styles.container} data-testid="flyout">
      <p className={styles.info}>
        The number of selected cards - <strong>{numberOfCards}</strong>
      </p>
      <div className={styles.buttons}>
        <Button onClick={unselectAll}>Unselect all</Button>
        <Button>
          <a href={downloadUrl} download={`${numberOfCards}_spacecrafts.csv`}>
            Download
          </a>
        </Button>
      </div>
    </div>
  );
}
