/* eslint-disable react/button-has-type */
import PropTypes from 'proptypes';
import React from 'react';
// import { promesify } from 'utils';

import Common from '@components/Common.form';
import styles from '@styles/Common.form.module.scss';

// const refsSchema = [{
//   name: 'username',
//   validator: (str) => promesify(str.length > 4, 'Your username must be at lest 4 characters long'),
// },
// {
//   name: 'email',
//   validator: (str) => promesify(Boolean(str.match(emailRegex)), 'Invalid email'),
// },
// {
//   name: 'password',
//   validator: (str) => promesify(str.length > 8, 'Your password must be at least 8 characters long'),
// }];

const Register = (props) => {
  const { openModal } = props;
  // const { openModal } = useContext(ModalContext);
  // const register = useConnectionDataHandler('register', 'Unable to create user', props)
  // const {
  //   refs, handleSubmit, errorMessage,
  // } = useGeneratedInputRefs(refsSchema, register, { noWhite: true });

  const openModalHandler = () => openModal('login', props);
  const handleSubmit = (e) => e.preventDefault();
  const errorMessage = '';
  return (
    <Common imgSrc="/Japan.webp" mirrorImg>
      <form>
        <h2>REGISTER</h2>
        <div className={styles.inputContainer}>
          <input name="username" placeholder="Username" type="text" />
          <input name="email" placeholder="E-Mail Address" type="text" />
          <input name="password" placeholder="Password" type="password" />
        </div>
        <div className={styles.formError}>
          <div className={styles.errorMessage}>{errorMessage}</div>
        </div>
        <div className={styles.links}>
          <button onClick={openModalHandler}>I already have an account</button>
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

Register.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default Register;
