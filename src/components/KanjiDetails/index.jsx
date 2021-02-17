import Image from 'next/image';

import Furigana from '@components/Furigana';
import { kanjiPropTypes } from '@propTypes';
import styles from '@styles/Kanji.module.scss';

const KanjiDetails = ({ kanji }) => {
  if (!kanji) return null;

  const {
    character,
    meaning,
    onyomi,
    kunyomi,
    strokes: { count, images },
    video: { poster, video } = {},
    references: { grade, jlpt } = {},
    examples = [],
  } = kanji;

  return (
    <div className={styles.kanjiStyle}>
      <div className={styles.kanjiInfo}>
        {video ? (
          <video controls poster={poster}>
            <track kind="captions" />
            <source src={video} />
          </video>
        ) : (
          <div className={styles.kanji}>{character}</div>
        )}
        <div className={styles.strokeCount}>{`Strokes: ${count}`}</div>
      </div>
      <div className={styles.meanings}>
        {meaning}
        <div>On: {onyomi || 'N/A'}</div>
        <div>Kun: {kunyomi || 'N/A'}</div>
        <div className={styles.strokes}>
          <div className={styles.imgContainer}>
            {images.map((url) => (
              <div className={styles.imgBorder}>
                <div className={styles.verticalLine} />
                <div className={styles.horizontalLine} />
                <Image
                  layout="fixed"
                  height={100}
                  width={100}
                  src={url}
                  alt="kanji"
                  className={styles.strokeImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.references}>
        {jlpt && <div>JLPT: {jlpt}</div>}
        {grade && <div>grade: {grade}</div>}
      </div>
      <div className={styles.examples}>
        {examples?.map(({ audio, furigana, meaning: meaningStr, word }) => (
          <div className={styles.exContainer}>
            <Furigana word={word} reading={furigana} cName="exWord" />
            <div className={styles.exMeaning}>{meaningStr}</div>
            {audio && (
              <audio controls>
                <track kind="captions" />

                <source src={audio.audio} type={`audio/${audio.format}`} />
              </audio>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

KanjiDetails.propTypes = kanjiPropTypes;

KanjiDetails.defaultProps = {
  kanji: null,
};

export default KanjiDetails;
