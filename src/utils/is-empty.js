import isArray from './is-array';

const isEmpty = (val) => {
  if (!val) return true;
  if (isArray(val) && !val.length) return true;
  if (typeof val === 'object' && !isArray(val) && !Object.keys(val).length) {
    return true;
  }

  return false;
};

export default isEmpty;
