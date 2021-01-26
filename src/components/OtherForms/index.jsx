import PropTypes from 'proptypes';

import styles from '@styles/Word.module.scss';

const OtherForms = ({ japanese }) => (
  <div className={styles.otherForms}>
    <i className={styles['of-title']}>Other forms:</i>
    {japanese.map(({ _id: id, reading, word }) => {
      const actualWord = word || reading;
      const furi = word ? `【${reading}】` : '';

      return <span key={id}>{`${actualWord}${furi}`}</span>;
    })}
  </div>
);

OtherForms.propTypes = {
  japanese: PropTypes.arrayOf(
    PropTypes.shape({
      reading: PropTypes.string,
      word: PropTypes.string,
    }),
  ),
};

OtherForms.defaultProps = {
  japanese: [],
};

export default OtherForms;
