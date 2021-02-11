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
  const { examples: exampleIds, ...kanji } = res?.data || {};

  let examples = [];
  if (exampleIds && exampleIds.length) {
    const uri = exampleIds.map((id) => `ids=${id}`).join('&');

    const resEx = await axios(encodeURI(`${apiEndPoint}/examples?${uri}`));
    examples = resEx?.data;
  }
  return {
    props: {
      kanji: {
        ...kanji,
        examples,
      },
    },
    revalidate: 1,
  };
};

export default KanjiDetails;
