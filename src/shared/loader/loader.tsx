import React from 'react';

import styles from './loader.module.scss';

class Loader extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <span className={styles.loader} />
      </div>
    );
  }
}

export default Loader;
