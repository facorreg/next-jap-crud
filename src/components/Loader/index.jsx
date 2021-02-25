import styles from '@styles/Loader.module.scss';

const Loader = () => (
  <div className={styles['lds-container']}>
    <div className={styles['lds-default']}>
      {Array.from(new Array(12)).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} />
      ))}
    </div>
  </div>
);

export default Loader;
