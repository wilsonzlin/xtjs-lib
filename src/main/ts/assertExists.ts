import {AssertionError} from './assert/assert';

export default <V> (val: V | null | undefined, msg: string = 'Unexpected undefined or null'): V => {
  if (val == undefined) {
    throw new AssertionError(msg);
  }
  return val;
};
