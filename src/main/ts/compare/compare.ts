export interface Comparator<T> {
  (a: T, b: T): number;
}

// Integers are finite non-NaN numbers in the range [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER].
export const compareIntegers: Comparator<number> = (a: number, b: number) => {
  return a - b;
};

export const compareStrings: Comparator<string> = (a: string, b: string) => {
  return a.localeCompare(b);
};

// Nulls are less than all values of T.
export const compareNullableFirst = <T> (comparator: Comparator<T>): Comparator<T | null> => {
  return (a, b) => {
    if (a === null && b === null) {
      return 0;
    }
    if (a === null) {
      return -1;
    }
    if (b === null) {
      return 1;
    }
    return comparator(a, b);
  };
};

// Nulls are greater than all values of T.
export const compareNullableLast = <T> (comparator: Comparator<T>): Comparator<T | null> => {
  return (a, b) => {
    if (a === null && b === null) {
      return 0;
    }
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    return comparator(a, b);
  };
};

export const compareReverse = <T> (comparator: Comparator<T>): Comparator<T> => {
  return (a, b) => comparator(a, b) * -1;
};

export const compareArrays = <T> (elemComparator: Comparator<T>): Comparator<T[]> => {
  return (a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const elemCmp = elemComparator(a[i], b[i]);
      if (elemCmp) {
        return elemCmp;
      }
    }
    return compareIntegers(a.length, b.length);
  };
};

export const compareProperty = <O, P extends keyof O> (prop: P, propComparator: Comparator<O[P]>): Comparator<O> => {
  return (a, b) => propComparator(a[prop], b[prop]);
};

export const compareDerived = <O, D> (derivation: (val: O) => D, derivedComparator: Comparator<D>): Comparator<O> => {
  return (a, b) => derivedComparator(derivation(a), derivation(b));
};

export const compareUsing = <T> (...comparators: Comparator<T>[]): Comparator<T> => {
  return (a, b) => comparators.reduce((result, comparator) => result || comparator(a, b), 0);
};
