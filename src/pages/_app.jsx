import '@styles/globals.scss';
import { Provider } from 'jotai';
import Head from 'next/head';
import PropTypes from 'proptypes';

import Header from '@components/Header';
import Modal from '@components/Modal';

function MyApp({ Component, pageProps }) {
  return (
    <div id="japApp">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          // eslint-disable-next-line no-secrets/no-secrets
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider>
        <Modal />
        <Header />
        <Component {...pageProps} />
      </Provider>
    </div>
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
