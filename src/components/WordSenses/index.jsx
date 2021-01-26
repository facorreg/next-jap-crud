import PropTypes from 'proptypes';

import styles from '@styles/Word.module.scss';

const WordSenses = ({ senses }) => (
  <div className={styles.sensesContainer}>
    {senses.map(({ _id: id, definitions, partsOfSpeech, tags }, i) => (
      <div className={styles.sense} key={id}>
        <i className={styles.pos}>{partsOfSpeech}</i>
        <div className={styles.definitions}>{definitions}</div>
        <i className={styles.tags}>{tags}</i>
      </div>
    ))}
  </div>
);

WordSenses.propTypes = {
  senses: PropTypes.arrayOf(
    PropTypes.shape({
      definitions: PropTypes.string,
      examples: PropTypes.arrayOf(PropTypes.string),
      partsOfSpeech: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
};

WordSenses.defaultProps = {
  senses: [],
};

export default WordSenses;
