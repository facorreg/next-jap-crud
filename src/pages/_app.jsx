import '@styles/globals.scss';
import Head from 'next/head';
import PropTypes from 'proptypes';

import ForgotForm from '@components/Forgot.form';
import Header from '@components/Header';
import LoginForm from '@components/Login.form';
import Modal from '@components/Modal';
import RegisterForm from '@components/Register.form';

function MyApp({ Component, pageProps }) {
  const modalComponents = {
    forgot: ForgotForm,
    // kanji: KanjiPage,
    login: LoginForm,
    register: RegisterForm,
    // createDeck: CreateDeck,
    // createCard: CreateCard,
    // dialog: Dialog,
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          // eslint-disable-next-line no-secrets/no-secrets
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Modal modalComponents={modalComponents}>
        <Header />
        <Component {...pageProps} />
      </Modal>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
  ]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object,
};

MyApp.defaultProps = {
  pageProps: {},
};

export default MyApp;
