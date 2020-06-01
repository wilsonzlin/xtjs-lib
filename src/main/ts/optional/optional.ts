import {AssertionError} from '../assert/assert';

export const exists = <V> (val: V | null | undefined): val is V => val != undefined;

export const defined = <V> (val: V | undefined): val is V => val !== undefined;

export const mapOptional = <T, R> (val: T | null | undefined, mapper: (val: T) => R) => val == null ? undefined : mapper(val);

export const mapDefined = <V, R> (val: V | undefined, mapper: (val: V) => R): R | undefined => val === undefined ? undefined : mapper(val);

export const ifDefined = <T> (val: T | undefined, fn: (val: T) => void) => {
  if (val !== undefined) {
    fn(val);
  }
};

export const definedOr = <V> (value: V | undefined, fallback: V): V => value === undefined ? fallback : value;

export const assertExists = <V> (val: V | null | undefined, msg: string = 'Unexpected undefined or null'): V => {
  if (val == undefined) {
    throw new AssertionError(msg);
  }
  return val;
};

export const assertDefined = <V> (val: V | undefined, msg: string = 'Unexpected undefined'): V => {
  if (val === undefined) {
    throw new AssertionError(msg);
  }
  return val;
};
