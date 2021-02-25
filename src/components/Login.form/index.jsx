/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import axios from 'axios';
import { useAtom } from 'jotai';
import qs from 'qs';
import React from 'react';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line import/no-cycle
import { openModalAtom, closeModalAtom, meAtom } from '@atoms';
import Common from '@components/Common.form';
import styles from '@styles/Common.form.module.scss';
import { getEnv } from '@utils';

const Login = (props) => {
  const { errors, handleSubmit, register } = useForm();
  const [, openModal] = useAtom(openModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);
  const [, setMe] = useAtom(meAtom);

  const openModalHandler = () => {
    // @todo: forgot password modal
    openModal({ modalName: 'register', props });
  };

  const onSubmit = async (data) => {
    try {
      const url = `${getEnv('API_ENDPOINT', 'http://localhost:4000')}/login`;

      const config = {
        data: qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
        url,
      };

      const me = await axios(config);
      closeModal();
      setMe(me?.data);
    } catch (err) {
      //
    }
  };

  const errorMsg = Object.keys(errors).find((key) => errors[key]);
  return (
    <Common imgSrc="/torii.jpg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>LOGIN</h2>
        <div className={styles.inputContainer}>
          <input
            name="identifier"
            placeholder="Username or E-mail Address"
            type="text"
            ref={register({
              maxLength: 20,
              minLength: 4,
              required: true,
            })}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            ref={register({
              maxLength: 60,
              minLength: 4,
              required: true,
            })}
          />
        </div>
        <div className={styles.formError}>
          {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}
        </div>
        <div className={styles.links}>
          <div onClick={openModalHandler}>I forgot my password</div>
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

export default Login;
