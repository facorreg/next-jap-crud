import Bubbled from '@components/Bubbled';
import { examplePropTypes } from '@propTypes';
import styles from '@styles/Word-example.module.scss';

const WordExample = ({ en, tokens }) => {
  return (
    <div className={styles.wExample}>
      <div>{en}</div>
      <div className={styles.furiList}>
        {tokens.map((token) => (
          <Bubbled token={token} />
        ))}
      </div>
    </div>
  );
};

WordExample.propTypes = examplePropTypes;

export default WordExample;
