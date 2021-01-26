import Image from 'next/image';
import PropTypes from 'proptypes';
import React from 'react';

import styles from '@styles/Common.form.module.scss';

const CommonForm = ({ children, imgSrc, mirrorImg }) => {
  // const mirrorStyle = { transform: `scaleX(${mirrorImg ? -1 : 1})` };
  return (
    <div className={styles.commonForm}>
      <Image src={imgSrc} layout="fill" className={mirrorImg ? styles.mirrored : ''} />
      {children}
    </div>
  );
};

CommonForm.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  imgSrc: PropTypes.string.isRequired,
  mirrorImg: PropTypes.bool,
};

CommonForm.defaultProps = {
  mirrorImg: false,
};

export default CommonForm;
