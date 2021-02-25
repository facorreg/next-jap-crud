import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'proptypes';

import Furigana from '@components/Furigana';
import Loader from '@components/Loader';
import ownKeyDownHandler from '@hooks/ownDirKeyDownHandler';
import { examplePropTypes } from '@propTypes';
import styles from '@styles/Question.module.scss';
// eslint-disable-next-line sonarjs/cognitive-complexity
const WordQuestion = (props) => {
  const { error, loaded, words: rawWords } = props;
  const router = useRouter();
  const { reading } = router.query;

  if (!loaded) return <Loader />;
  if (error) return <div>error</div>;

  const words = reading
    ? rawWords.filter(({ japanese } = {}) => japanese?.find(({ reading: jr }) => reading === jr))
    : rawWords;

  if (!words) return null;
  const readingsByWord = words.map(({ japanese }) => japanese.length);

  const [mainIndex, secondaryIndex] = ownKeyDownHandler(readingsByWord);

  return (
    <div className={styles.questionContainer}>
      <Furigana {...((words[mainIndex]?.japanese || [])[secondaryIndex] || {})} cName="question" />
      <br />
      <div className={styles.infos}>
        word: {mainIndex + 1} / {words.length}
      </div>
      <div className={styles.infos}>
        reading: {secondaryIndex + 1} / {words[mainIndex]?.japanese?.length || 1}
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

WordQuestion.propTypes = {
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

WordQuestion.defaultProps = {
  error: '',
  loaded: false,
  words: null,
};

export default WordQuestion;
