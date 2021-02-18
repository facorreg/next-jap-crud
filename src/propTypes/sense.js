import PropTypes from 'proptypes';

import examplePropTypes from './example';

const sensePropTypes = PropTypes.shape({
  definitions: PropTypes.string,
  examples: PropTypes.arrayOf(examplePropTypes),
  partsOfSpeech: PropTypes.string,
  tags: PropTypes.string,
});

export default sensePropTypes;
