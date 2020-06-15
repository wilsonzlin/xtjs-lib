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

export const join = <T> (ary: T[], join: T): T[] => {
  const res = [];
  for (let i = 0; i < ary.length; i++) {
    if (i != 0) {
      res.push(join);
    }
    res.push(ary[i]);
  }
  return res;
};

export const computedJoin = <T> (ary: T[], join: (l: T, r: T) => T): T[] => {
  const res = [];
  for (let i = 0; i < ary.length; i++) {
    if (i != 0) {
      res.push(join(ary[i - 1], ary[i]));
    }
    res.push(ary[i]);
  }
  return res;
};
