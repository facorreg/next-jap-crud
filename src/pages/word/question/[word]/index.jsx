import axios from 'axios';
import PropTypes from 'proptypes';

import Furigana from '@components/Furigana';
import ownKeyDownHandler from '@hooks/ownDirKeyDownHandler';
import { kanjiPropTypes } from '@propTypes';
import styles from '@styles/Question.module.scss';

// eslint-disable-next-line sonarjs/cognitive-complexity
const WordQuestion = (props) => {
  const { words } = props;
  // console.log(words);

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
  const res = await axios(encodeURI(`http://localhost:4000/word/${context.params.word}`));
  // console.log('q', context.params.word);

  return {
    props: {
      words: res?.data,
    },
    revalidate: 1,
  };
};

WordQuestion.propTypes = {
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
          examples: PropTypes.arrayOf(kanjiPropTypes.kanji),
          partsOfSpeech: PropTypes.string,
          tags: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

export default WordQuestion;
