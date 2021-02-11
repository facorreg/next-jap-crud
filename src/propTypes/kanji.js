import PropTypes from 'proptypes';

const kanjiPropTypes = {
  kanji: PropTypes.shape({
    character: PropTypes.string,
    examples: PropTypes.arrayOf(PropTypes.string),
    kunyomi: PropTypes.string,
    meaning: PropTypes.string,
    onyomi: PropTypes.string,
    references: PropTypes.shape({ grade: PropTypes.number, jlpt: PropTypes.number }),
    strokes: PropTypes.shape({
      count: PropTypes.number,
      images: PropTypes.arrayOf(PropTypes.string),
    }),
    video: PropTypes.shape({
      poster: PropTypes.string,
      video: PropTypes.string,
    }),
  }),
};

export default kanjiPropTypes;
