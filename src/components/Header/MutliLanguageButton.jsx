import PropTypes from 'proptypes';
import { useState } from 'react';

import styles from '@styles/Header.module.scss';

const MultiLanguageButton = ({ en, jp, onClickHandler }) => {
  const [message, setMessage] = useState(en);

  const changeMessage = (msg) => () => setMessage(msg);

  return (
    <div
      onMouseEnter={changeMessage(jp)}
      onMouseLeave={changeMessage(en)}
      onClick={onClickHandler}
      className={styles.menuButton}
      role="button"
      aria-hidden="true"
    >
      {message}
    </div>
  );
};

MultiLanguageButton.propTypes = {
  en: PropTypes.string.isRequired,
  jp: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func,
};

MultiLanguageButton.defaultProps = {
  onClickHandler: () => {},
};

export default MultiLanguageButton;
