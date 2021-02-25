import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'proptypes';
import { v4 as uuidv4 } from 'uuid';

import Furigana from '@components/Furigana';
import KanjiList from '@components/Kanji-list';
import Loader from '@components/Loader';
import OtherForms from '@components/OtherForms';
import WordSenses from '@components/WordSenses';
import { examplePropTypes } from '@propTypes';
import styles from '@styles/Word.module.scss';
import { flattenDeep } from '@utils';

const uniqBy = (array, callback) => {
  return array.reduce((acc, el) => {
    const found = acc.find((accEl) => callback(accEl, el));
    if (found) {
      return acc;
    }

    return [...acc, el];
  }, []);
};

// @todo: passer de pages dynamiques a pages statiques

const WordPage = (props) => {
  const { error, loaded, words: rawWords } = props;
  const router = useRouter();
  const { reading } = router.query;

  if (!loaded) return <Loader />;
  if (error) return <div>{error}</div>;

  const words = reading
    ? rawWords.filter(({ japanese } = {}) => japanese?.find(({ reading: jr }) => reading === jr))
    : rawWords;

  if (!words) return <div>could not find word</div>;

  const kanjiList = uniqBy(
    flattenDeep(words?.map(({ kanjis }) => kanjis)),
    ({ character }, { character: character2 }) => character === character2,
  );

  return (
    <div className={styles.wordStyle}>
      <div className={styles.wordList}>
        {words?.map(({ japanese, senses }) => {
          const [{ reading: jr, word }, ...rest] = japanese;
          return (
            <div className={styles.singleWord} key={uuidv4()}>
              <Furigana word={word} reading={jr} containerCName="dictionaryWord" />
              <WordSenses senses={senses} />
              {rest.length ? <OtherForms japanese={rest} /> : null}
            </div>
          );
        })}
      </div>
      <KanjiList kanjiList={kanjiList} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const words = await axios('http://localhost:4000/word/word-name-list');

  const paths = words?.data?.map((word) => ({
    params: { word },
  }));

  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps = async (context) => {
  try {
    const res = await axios(encodeURI(`http://localhost:4000/word/${context.params.word}`));

    return {
      props: {
        loaded: true,
        words: res?.data,
      },
      revalidate: 1,
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
        loaded: true,
        words: null,
      },
    };
  }
};
WordPage.propTypes = {
  error: PropTypes.string,
  loaded: PropTypes.bool,
  words: PropTypes.arrayOf(
    PropTypes.shape({
      japanese: PropTypes.arrayOf(
        PropTypes.shape({
          reading: PropTypes.string,
          word: PropTypes.string,
        }),
      ),
      senses: PropTypes.arrayOf(
        PropTypes.shape({
          definitions: PropTypes.string,
          examples: PropTypes.arrayOf(examplePropTypes),
          partsOfSpeech: PropTypes.string,
          tags: PropTypes.string,
        }),
      ),
    }),
  ),
};

WordPage.defaultProps = {
  error: '',
  loaded: false,
  words: null,
};

export default WordPage;
