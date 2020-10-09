import identity from './identity';

export default <T> (key: (val: T) => any = identity) => {
  const seen = new Set();
  return (val: T) => {
    const k = key(val);
    if (seen.has(k)) {
      return false;
    }
    seen.add(k);
    return true;
  };
};
