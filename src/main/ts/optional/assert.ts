import {AssertionError} from '../assert/assert';

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
