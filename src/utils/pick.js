const pick = (obj, keys) => {
  const objKeys = Object.keys(obj);
  const validKeys = objKeys.filter((key) => keys.includes(key));

  return validKeys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
};

export default pick;
