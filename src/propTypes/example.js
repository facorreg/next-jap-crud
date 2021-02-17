import PropTypes from 'proptypes';

import tokenPropTypes from './token';

/*
  These are not the kanji examples, but the sense examples (the tokenized ones)
*/

const examplePropTypes = PropTypes.shape({
  en: PropTypes.string,
  tokens: PropTypes.arrayOf(tokenPropTypes),
});

export default examplePropTypes;
