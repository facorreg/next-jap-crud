import PropTypes from 'proptypes';
import { v4 as uuidv4 } from 'uuid';

import { sensePropTypes } from '@propTypes';
import styles from '@styles/Word.module.scss';

import Sense from './Sense';

const WordSenses = ({ senses }) => {
  return (
    <div className={styles.sensesContainer}>
      {senses.map((sense) => (
        <Sense sense={sense} key={uuidv4()} />
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
