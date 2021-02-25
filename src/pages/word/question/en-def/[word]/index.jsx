import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'proptypes';

// import Furigana from '@components/Furigana';
import Loader from '@components/Loader';
import ownKeyDownHandler from '@hooks/ownDirKeyDownHandler';
import { examplePropTypes } from '@propTypes';
import styles from '@styles/Question.module.scss';
// eslint-disable-next-line sonarjs/cognitive-complexity
const WordQuenstionEn = (props) => {
  const { error, loaded, words: rawWords } = props;

  if (!loaded) return <Loader />;
  if (error) return <div>error</div>;

  const router = useRouter();
  const { reading } = router.query;

  const words = reading
    ? rawWords.filter(({ japanese } = {}) => japanese?.find(({ reading: jr }) => reading === jr))
    : rawWords;

  if (!words) return null;

  if (!words) return <div>Could not find the word you were looking for</div>;
  const sensesByWord = words.map(({ senses }) => senses?.length);

  const [mainIndex, secondaryIndex] = ownKeyDownHandler(sensesByWord);
  // const mainIndex = 0;
  // const secondaryIndex = 0;
  return (
    <div className={styles.questionContainer}>
      <div>{(words[mainIndex]?.senses || [])[secondaryIndex]?.definitions}</div>
      <br />
      <div className={styles.infos}>
        word: {mainIndex + 1} / {words.length}
      </div>
      <div className={styles.infos}>
        definition: {secondaryIndex + 1} / {words[mainIndex]?.senses?.length || 1}
      </div>
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
  } catch {
    return {
      props: {
        error: 'An error occured',
        loaded: true,
        words: null,
      },
    };
  }
};

WordQuenstionEn.propTypes = {
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

WordQuenstionEn.defaultProps = {
  error: '',
  loaded: false,
  words: null,
};

export default WordQuenstionEn;
