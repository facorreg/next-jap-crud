import axios from 'axios';
import PropTypes from 'proptypes';

// import Furigana from '@components/Furigana';
import ownKeyDownHandler from '@hooks/ownDirKeyDownHandler';
import { kanjiPropTypes } from '@propTypes';
import styles from '@styles/Question.module.scss';

// eslint-disable-next-line sonarjs/cognitive-complexity
const WordQuestion = (props) => {
  const { words } = props;

  if (!words) return null;
  const sensesByWord = words.map(({ senses }) => senses.length);

  const [mainIndex, secondaryIndex] = ownKeyDownHandler(sensesByWord);
  // const mainIndex = 0;
  // const secondaryIndex = 0;
  return (
    <div className={styles.questionContainer}>
      <div>{words[mainIndex].senses[secondaryIndex]?.definitions}</div>
      <br />
      <div className={styles.infos}>
        word: {mainIndex + 1} / {words.length}
      </div>
      <div className={styles.infos}>
        definition: {secondaryIndex + 1} / {words[mainIndex].senses.length}
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
