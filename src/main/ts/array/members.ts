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

export const mapEmpty = <T, R> (ary: T[], fn: (ary: T[]) => R): R | undefined =>
  ary.length != 0 ? undefined : fn(ary);

export const mapNonEmpty = <T, R> (ary: T[], fn: (ary: T[]) => R): R | undefined =>
  ary.length == 0 ? undefined : fn(ary);
