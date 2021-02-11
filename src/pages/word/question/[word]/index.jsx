import axios from 'axios';
import PropTypes from 'proptypes';
import { useState, useEffect } from 'react';

import Furigana from '@components/Furigana';
import { kanjiPropTypes } from '@propTypes';
import { isSSG } from '@utils';

// eslint-disable-next-line sonarjs/cognitive-complexity
const WordQuestion = (props) => {
  const { words } = props;
  const [wordIndex, setWordIndex] = useState(0);
  const [japaneseIndex, setJapaneseIndex] = useState(0);

  const onKeyUpHandler = (event) => {
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const updateWordIndex = (value) => {
      let newVal = wordIndex + value;

      setJapaneseIndex(0);

      if (newVal < 0) {
        newVal = words.length - 1;
      } else if (newVal === words.length) {
        newVal = 0;
      }

      setWordIndex(newVal);
      return newVal;
    };

    const updateJapaneseIndex = (value) => {
      const newVal = japaneseIndex + value;

      if (newVal < 0) {
        const newIndex = updateWordIndex(-1);
        setJapaneseIndex(words[newIndex].japanese.length - 1);
        // eslint-disable-next-line react/prop-types
      } else if (newVal === words[wordIndex].japanese?.length) {
        updateWordIndex(1);
      } else {
        setJapaneseIndex(newVal);
      }
    };

    if (event.keyCode === RIGHT || event.keyCode === LEFT) {
      updateWordIndex(event.keyCode === RIGHT ? 1 : -1);
    } else if (event.keyCode === UP || event.keyCode === DOWN) {
      updateJapaneseIndex(event.keyCode === UP ? 1 : -1);
    }
  };

  useEffect(() => {
    if (!isSSG()) {
      window.addEventListener('keyup', onKeyUpHandler);
    }

    return () => {
      if (!isSSG()) window.removeEventListener('keyup', onKeyUpHandler);
    };
  });

  if (!words) return null;

  return <Furigana {...(words[wordIndex]?.japanese[japaneseIndex] || {})} cName="question" />;
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
