import PropTypes from 'proptypes';

const tokensPropTypes = PropTypes.shape({
  basicForm: PropTypes.string,
  conjugatedForm: PropTypes.string,
  conjugatedType: PropTypes.string,
  pos: PropTypes.string,
  posDetail1: PropTypes.string,
  posDetail2: PropTypes.string,
  posDetail3: PropTypes.string,
  pronounciation: PropTypes.string,
  reading: PropTypes.string,
  surfaceFrom: PropTypes.string,
  wordId: PropTypes.number,
  wordPosition: PropTypes.number,
  wordType: PropTypes.string,
});

export default tokensPropTypes;
