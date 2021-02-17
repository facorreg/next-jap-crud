import PropTypes from 'proptypes';

import WordExample from '@components/WordExample';
import { examplePropTypes } from '@propTypes';
import styles from '@styles/Word.module.scss';

const WordSenses = ({ senses }) => {
  return (
    <div className={styles.sensesContainer}>
      {senses.map(({ _id: id, definitions, examples, partsOfSpeech, tags }, i) => (
        <div className={styles.sense} key={id}>
          <i className={styles.pos}>{partsOfSpeech}</i>
          <div className={styles.definitions}>{definitions}</div>
          <i className={styles.tags}>{tags}</i>
          {examples.map(WordExample)}
        </div>
      ))}
    </div>
  );
};

WordSenses.propTypes = {
  senses: PropTypes.arrayOf(
    PropTypes.shape({
      definitions: PropTypes.string,
      examples: PropTypes.arrayOf(examplePropTypes),
      partsOfSpeech: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
};

WordSenses.defaultProps = {
  senses: [],
};

export default WordSenses;
