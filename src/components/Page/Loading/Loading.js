import React from 'react';
import styles from './style.module.css';
// import { ReactComponent as LoadingIcon } from 'components/atoms/icon/loading.svg';

const Loading = () => (
  <div className={styles.divLoader}>
    {/* <LoadingIcon className={styles.svgLoader} /> */}
    <div id="spinner" className={styles.container}>
      <div className={styles.loading}></div>
    </div>
  </div>
);

export default Loading;
