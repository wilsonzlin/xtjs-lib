export const createDistinctFilter = <T> (key: (val: T) => any = v => v): (val: T) => boolean => {
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

export const distinct = <T> (ary: T[]): T[] => [...new Set(ary)];
