/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAtom } from 'jotai';
import PropTypes from 'proptypes';
import React from 'react';

import { openModalAtom } from '@atoms';
import styles from '@styles/Word.module.scss';

const KanjiList = ({ kanjiList }) => {
  const [, openModal] = useAtom(openModalAtom);
  const openModalHandler = (props) => () => openModal({ modalName: 'kanji', props });

  return (
    <div className={styles.kanjiList}>
      {kanjiList?.map((kanji) => {
        const {
          character,
          meaning,
          onyomi,
          kunyomi,
          strokes: { count },
          references: { grade, jlpt } = {},
          _id: id,
        } = kanji;
        return (
          <div className={styles.kanjiInfo} key={id}>
            <div className={styles.kanji} onClick={openModalHandler({ kanji })}>
              {character}
            </div>
            {count && <div className={styles.strokeCount}>strokes: {count}</div>}
            <div className={styles.meanings}>
              <div>{meaning}</div>
              <div>On: {onyomi || 'N/A'}</div>
              <div>Kun: {kunyomi || 'N/A'}</div>
            </div>
            <div className={styles.references}>
              {jlpt && <div>JLPT: {jlpt}</div>}
              {grade && <div>grade: {grade}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

KanjiList.propTypes = {
  kanjiList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      character: PropTypes.string,
      kunyomi: PropTypes.string,
      meaning: PropTypes.string,
      onyomi: PropTypes.string,
      references: PropTypes.shape({ grade: PropTypes.number, jlpt: PropTypes.number }),
      strokes: PropTypes.shape({ count: PropTypes.number }),
    }),
  ),
};

KanjiList.defaultProps = {
  kanjiList: [],
};

export default KanjiList;
