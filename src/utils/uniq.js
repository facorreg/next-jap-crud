const uniq = (arr) =>
  arr.filter((e, i) => {
    return arr.indexOf(e) === i;
  });

export default uniq;
