import { toHiragana } from 'wanakana';

import Furigana from '@components/Furigana';
import { tokenPropTypes } from '@propTypes';
import styles from '@styles/Bubbled.module.scss';
import { filterEmpty } from '@utils';

/*
  Attention aux effets de bord du CSS
*/

const Bubbled = ({ token: rawToken }) => {
  const mainPos = {
    adjective: '#006466',
    adverb: '#312244',

    alphabet: '#065a60',
    auxiliary: '#3e1f47',

    conjunction: '#0b525b',
    counter: '#4d194d',

    name: '#144552',
    noun: '#012a4a',

    other: '#1b3a4b',
    particle: '#01497c',

    prefix: '#212f45',
    suffix: '#2a6f97',

    verb: '#272640',
  };

  const token = Object.keys(rawToken).reduce((acc, key) => {
    if (rawToken[key] === '*') return acc;

    return { ...acc, [key]: rawToken[key] };
  }, {});

  const pos = filterEmpty([token.pos, token.posDetail1, token.posDetail2, token.posDetail3]).join(
    ', ',
  );

  const colorStyleName = Object.keys(mainPos).find((e) => token.pos?.includes(e)) || 'other';
  const colorStyle = mainPos[colorStyleName];

  const bcg = { backgroundColor: colorStyle };
  const border = { borderTopColor: colorStyle };

  return (
    <span>
      <Furigana
        reading={toHiragana(token.reading)}
        word={token.basicForm}
        containerCName="wExfurignaContainer"
        style={bcg}
      >
        <div className={styles['speech-bubble-container']}>
          <div className={styles['speech-bubble']} style={{ ...bcg, ...border }}>
            <div>basic form: {token.basicForm}</div>
            {token.conjugatedType && <div>conjugated type: {token.conjugatedType}</div>}
            {token.conjugatedForm && <div>conjugated form: {token.conjugatedForm}</div>}
            <div>
              {'part of speech: '}
              {pos}
            </div>
            <div>reading: {token.reading}</div>
            {token.pronounciation && <div>pronounciation: {token.pronounciation}</div>}
          </div>
        </div>
      </Furigana>
    </span>
  );
};

Bubbled.propTypes = {
  token: tokenPropTypes.isRequired,
};

export default Bubbled;
