/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import axios from 'axios';
import { useAtom } from 'jotai';
import qs from 'qs';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line import/no-cycle
import { openModalAtom, closeModalAtom, meAtom } from '@atoms';
import Common from '@components/Common.form';
import styles from '@styles/Common.form.module.scss';
import { getEnv } from '@utils';

const Register = (props) => {
  const { errors, handleSubmit, register } = useForm();
  const [, openModal] = useAtom(openModalAtom);
  const [, closeModal] = useAtom(closeModalAtom);
  const [, setMe] = useAtom(meAtom);

  const openModalHandler = () => {
    openModal({ modalName: 'login', props });
  };
  const onSubmit = async (data) => {
    try {
      const url = `${getEnv('API_ENDPOINT', 'http://localhost:4000')}/user`;

      const config = {
        data: qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'put',
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
    <Common imgSrc="/Japan.webp" mirrorImg>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>REGISTER</h2>
        <div className={styles.inputContainer}>
          <input
            name="username"
            placeholder="Username"
            type="text"
            ref={register({
              maxLength: 20,
              minLength: 4,
              required: true,
            })}
          />
          <input
            name="email"
            placeholder="E-Mail Address"
            type="text"
            ref={register({
              maxLength: 60,
              minLength: 4,
              required: true,
            })}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            ref={register({
              maxLength: 20,
              minLength: 4,
              required: true,
            })}
          />
          <input
            name="passwordConf"
            placeholder="Password Confirmation"
            type="password"
            ref={register({
              maxLength: 20,
              minLength: 4,
              required: true,
            })}
          />
        </div>
        <div className={styles.formError}>
          {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}
        </div>
        <div className={styles.links}>
          <div onClick={openModalHandler}>I already have an account</div>
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

export default Register;
