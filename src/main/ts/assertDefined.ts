import AssertionError from './AssertionError';

export default <V> (val: V | undefined, msg: string = 'Unexpected undefined'): V => {
  if (val === undefined) {
    throw new AssertionError(msg);
  }
  return val;
};
