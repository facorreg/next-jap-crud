import axios from 'axios';

import KanjiDetails from '@components/KanjiDetails';
import { getEnv } from '@utils';

const defaultApiUrl = 'http://localhost:4000';
const apiEndPoint = getEnv('API_ENDPOINT', defaultApiUrl);

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

export default KanjiDetails;
