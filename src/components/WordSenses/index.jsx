import PropTypes from 'proptypes';

import { sensePropTypes } from '@propTypes';
import styles from '@styles/Word.module.scss';

import Sense from './Sense';

const WordSenses = ({ senses }) => {
  return (
    <div className={styles.sensesContainer}>
      {senses.map((sense) => (
        <Sense sense={sense} />
      ))}
    </div>
  );
};

WordSenses.propTypes = {
  senses: PropTypes.arrayOf(sensePropTypes),
};

WordSenses.defaultProps = {
  senses: [],
};

export default WordSenses;
