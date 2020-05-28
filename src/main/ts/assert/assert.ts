import {definedOr, mapDefined} from '../optional/optional';

export class AssertionError extends Error {
}

export class UnreachableError extends AssertionError {
  constructor (val?: never, msg?: string) {
    super(definedOr(msg, mapDefined(val, String)));
  }
}

export const assertState = (chk: boolean, msg: string = 'Unexpected state'): void => {
  if (!chk) {
    throw new AssertionError(msg);
  }
};

export const assertInstanceOf = <V> (val: unknown, type: new (...args: any[]) => V, msg: string = 'Unexpected type of instance'): V => {
  if (!(val instanceof type)) {
    throw new AssertionError(msg);
  }
  return val;
};

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

export const assertIndexOf = (idx: number, msg: string = 'indexOf failed'): number => {
  if (idx < 0) {
    throw new AssertionError(msg);
  }
  return idx;
};
