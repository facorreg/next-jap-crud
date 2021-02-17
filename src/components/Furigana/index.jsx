import escapeStringRegexp from 'escape-string-regexp';
import PropTypes from 'proptypes';

import styles from '@styles/Word.module.scss';
import { isEmpty } from '@utils';

const allKanji = /([一-龯]|\u3005)+/g;

const sliceFirst = (array) => (!isEmpty(array) ? array.slice(1) : array);

const stringWithFurigana = (word, furigana) => {
  const buildRuby = (w, f = '') => `<ruby>${w}<rt>${f}</rt></ruby>`;

  if (word && !furigana) return word;
  if (!word && furigana) return furigana;

  const regWord = word.startsWith('*') ? sliceFirst(word) : word;
  const reg = new RegExp(escapeStringRegexp(regWord).replace(allKanji, '(.*)'));
  const matchedFurigana = sliceFirst(furigana.match(reg)) || [];

  const callback = (kanji) => buildRuby(kanji, matchedFurigana.shift());

  return word.replace(allKanji, callback);
};

const Furigana = ({ children, cName, containerCName, reading, style, word }) => {
  const actualWord = word || reading;
  const furigana = word ? reading : '';

  if (!actualWord) return <div />;

  return (
    <div className={styles[containerCName]} style={style}>
      <div
        className={styles[cName]}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: stringWithFurigana(actualWord, furigana) }}
      />
      {children && { ...children }}
    </div>
  );
};

Furigana.propTypes = {
  cName: PropTypes.string,
  children: PropTypes.element,
  containerCName: PropTypes.string,
  reading: PropTypes.string.isRequired,
  style: PropTypes.string,
  word: PropTypes.string.isRequired,
};

Furigana.defaultProps = {
  cName: '',
  children: null,
  containerCName: '',
  style: {},
};

export default Furigana;
