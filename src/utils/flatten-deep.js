import isArray from './is-array';

function flattenDeep(array = []) {
  return array.reduce((acc, val) => [...acc, ...(isArray(val) ? flattenDeep(val) : [val])], []);
}

export default flattenDeep;
