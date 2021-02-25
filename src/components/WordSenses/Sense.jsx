import { useState } from 'react';

import WordExample from '@components/WordExample';
import { sensePropTypes } from '@propTypes';
import styles from '@styles/Word.module.scss';

import Arrow from './Arrow';

const Sense = ({ sense: { _id: id, definitions, examples, partsOfSpeech, tags } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => setIsOpen(!isOpen);
  return (
    <div className={styles.sense} key={id}>
      <i className={styles.pos}>{partsOfSpeech}</i>
      <div className={styles.definitions}>{definitions}</div>
      <i className={styles.tags}>{tags}</i>
      {examples?.length ? (
        <div className={styles.wExListContainer}>
          {isOpen &&
            examples.map((data) => {
              return <WordExample {...data} />;
            })}
          <Arrow dir="up" shouldBeRendered={isOpen} onClickHandler={onClickHandler} />
          <Arrow dir="down" shouldBeRendered={!isOpen} onClickHandler={onClickHandler} />
        </div>
      ) : null}
    </div>
  );
};

Sense.propTypes = {
  sense: sensePropTypes.isRequired,
};

export default Sense;
