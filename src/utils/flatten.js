import isArray from './is-array';

const flatten = (array = []) =>
  array.reduce((acc, e) => (isArray(e) ? [...acc, ...e] : [...acc, e]), []);

export default flatten;
