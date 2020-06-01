import {AssertionError} from '../assert/assert';

export const assertIndexOf = (idx: number, msg: string = 'indexOf failed'): number => {
  if (idx < 0) {
    throw new AssertionError(msg);
  }
  return idx;
};

export const mapIndexOf = <R> (idx: number, mapper: (validIdx: number) => R): R | undefined => {
  return idx === -1 ? undefined : mapper(idx);
};
