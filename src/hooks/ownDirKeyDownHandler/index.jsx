import { useState, useEffect } from 'react';

import { isSSG } from '@utils';

const ownKeyDownHandler = (readingsByWord) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [secondaryIndex, setSecondaryIndex] = useState(0);

  const onKeyDownHandler = (event) => {
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const updatemainIndex = (value) => {
      let newVal = mainIndex + value;

      setSecondaryIndex(0);

      if (newVal < 0) {
        newVal = readingsByWord.length - 1;
      } else if (newVal === readingsByWord.length) {
        newVal = 0;
      }

      setMainIndex(newVal);
      return newVal;
    };

    const updatesecondaryIndex = (value) => {
      const newVal = secondaryIndex + value;

      if (newVal < 0) {
        const newIndex = updatemainIndex(-1);
        setSecondaryIndex(readingsByWord[newIndex] - 1);
        // eslint-disable-next-line react/prop-types
      } else if (newVal === readingsByWord[mainIndex]) {
        updatemainIndex(1);
      } else {
        setSecondaryIndex(newVal);
      }
    };

    if (event.keyCode === RIGHT || event.keyCode === LEFT) {
      updatemainIndex(event.keyCode === RIGHT ? 1 : -1);
    } else if (event.keyCode === UP || event.keyCode === DOWN) {
      updatesecondaryIndex(event.keyCode === DOWN ? 1 : -1);
    }
  };

  useEffect(() => {
    if (!isSSG()) {
      window.addEventListener('keydown', onKeyDownHandler);
    }

    return () => {
      if (!isSSG()) window.removeEventListener('keydown', onKeyDownHandler);
    };
  });

  return [mainIndex, secondaryIndex];
};

export default ownKeyDownHandler;
