/* eslint-disable react/button-has-type */
import PropTypes from 'proptypes';
import React from 'react';
// import { promesify } from 'utils';

import Common from '@components/Common.form';
import styles from '@styles/Common.form.module.scss';

// const refsSchema = [
//   {
//     name: 'identifier',
//     // validator: (str) =>
//     // promesify(str.length, 'Please enter either your e-mail or username to login'),
//   },
//   {
//     name: 'password',
//     // validator: (str) => promesify(str.length, 'Please provide your password to login'),
//   },
// ];

const Login = ({ openModal }) => {
  // const connect = useConnectionDataHandler('login', 'Unable to connect user', rest);
  // const { errorMessage, handleSubmit, refs } = useGeneratedInputRefs(refsSchema, connect, {
  //   noWhite: true,
  // });
  const openModalHandler = (modalName) => () => openModal(modalName);
  const handleSubmit = (e) => e.preventDefault();
  const errorMessage = '';

  return (
    <Common imgSrc="/torii.jpg">
      <form>
        <h2>LOGIN</h2>
        <div className={styles.inputContainer}>
          <input name="identifier" placeholder="Username or E-mail Address" type="text" />
          <input name="password" placeholder="Password" type="password" />
        </div>
        <div className={styles.formError}>
          <div className={styles.errorMessage}>{errorMessage}</div>
        </div>
        <div className={styles.links}>
          <button onClick={openModalHandler('forgot')}>I forgot my password</button>
        </div>
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

Login.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default Login;
