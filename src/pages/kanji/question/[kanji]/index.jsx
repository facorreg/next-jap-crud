import axios from 'axios';

import { kanjiPropTypes } from '@propTypes';
import styles from '@styles/Question.module.scss';
import { getEnv } from '@utils';

const defaultApiUrl = 'http://localhost:4000';
const apiEndPoint = getEnv('API_ENDPOINT', defaultApiUrl);

const KanjiQuestion = ({ kanji }) => {
  return <div className={styles.questionContainer}>{kanji?.character}</div>;
};

export const getStaticPaths = async () => {
  const kanjis = await axios(`${apiEndPoint}/kanji/kanji-list`);
  const paths = kanjis?.data?.map((kanji) => ({
    params: { kanji },
  }));
  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps = async (context) => {
  const res = await axios(encodeURI(`${apiEndPoint}/kanji/${context.params.kanji}`));

  const kanji = res?.data || {};
  return {
    props: {
      kanji: {
        ...kanji,
      },
    },
    revalidate: 1,
  };
};

KanjiQuestion.propTypes = kanjiPropTypes;

KanjiQuestion.defaultProps = {
  kanji: null,
};

export default KanjiQuestion;
