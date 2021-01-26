/* eslint-disable react/button-has-type */
import React from 'react';
// import { promesify } from 'utils';

import Common from '@components/Common.form';
import styles from '@styles/Common.form.module.scss';

const Forgot = () => {
  const errorMessage = '';
  const handleSubmit = (e) => e.preventDefault();

  return (
    <Common imgSrc="/traditional.jpg">
      <form>
        <h2>RESET PASSWORD</h2>
        <div className={styles.inputContainer}>
          <input name="email" placeholder="E-mail address" type="text" />
        </div>
        <div className={styles.formError}>
          <div className={styles.errorMessage}>{errorMessage}</div>
        </div>
        <div className={styles.links} />
        <input
          className={styles.submit}
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          disabled={false}
        />
      </form>
    </Common>
  );
};

Forgot.propTypes = {};

export default Forgot;
