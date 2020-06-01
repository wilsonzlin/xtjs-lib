import {AssertionError} from '../assert/assert';

export const assertInstanceOf = <V> (val: unknown, type: new (...args: any[]) => V, msg: string = 'Unexpected type of instance'): V => {
  if (!(val instanceof type)) {
    throw new AssertionError(msg);
  }
  return val;
};
