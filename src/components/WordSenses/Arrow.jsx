import PropTypes from 'proptypes';
import { IconContext } from 'react-icons';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';

import styles from '@styles/Word.module.scss';

const Arrow = ({ dir, onClickHandler, shouldBeRendered }) => {
  const ArrowComp = dir === 'up' ? RiArrowUpSFill : RiArrowDownSFill;
  const classDir = `wExListArrow${dir === 'up' ? 'Close' : 'Open'}`;

  const className = `${styles.wExListArrow} ${styles[classDir]}`;

  return (
    <>
      {shouldBeRendered && (
        <IconContext.Provider value={{ className, size: '1em' }}>
          <ArrowComp onClick={onClickHandler} />
        </IconContext.Provider>
      )}{' '}
    </>
  );
};

Arrow.propTypes = {
  dir: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  shouldBeRendered: PropTypes.bool.isRequired,
};

export default Arrow;
