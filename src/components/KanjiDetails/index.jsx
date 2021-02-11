import Image from 'next/image';
import PropTypes from 'proptypes';

import Furigana from '@components/Furigana';
import style from '@styles/Kanji.module.scss';

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
    <div className={style.kanjiStyle}>
      <div className={style.kanjiInfo}>
        {video ? (
          <video controls poster={poster}>
            <track kind="captions" />
            <source src={video} />
          </video>
        ) : (
          <div className={style.kanji}>{character}</div>
        )}
        <div className={style.strokeCount}>{`Strokes: ${count}`}</div>
      </div>
      <div className={style.meanings}>
        {meaning}
        <div>On: {onyomi || 'N/A'}</div>
        <div>Kun: {kunyomi || 'N/A'}</div>
        <div className={style.strokes}>
          <div className={style.imgContainer}>
            {images.map((url) => (
              <div className={style.imgBorder}>
                <div className={style.verticalLine} />
                <div className={style.horizontalLine} />
                <Image
                  layout="fixed"
                  height={100}
                  width={100}
                  src={url}
                  alt="kanji"
                  className={style.strokeImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.references}>
        {jlpt && <div>JLPT: {jlpt}</div>}
        {grade && <div>grade: {grade}</div>}
      </div>
      <div className={style.examples}>
        {examples.map(({ audio, furigana, meaning: meaningStr, word }) => (
          <div className={style.exContainer}>
            <Furigana word={word} reading={furigana} cName="exWord" />
            <div className={style.exMeaning}>{meaningStr}</div>
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

KanjiDetails.propTypes = {
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

KanjiDetails.defaultProps = {
  kanji: null,
};

export default KanjiDetails;
