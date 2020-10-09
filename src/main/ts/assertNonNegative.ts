import AssertionError from './AssertionError';

export default (val: number, msg: string = 'value is negative') => {
  if (val < 0) {
    throw new AssertionError(msg);
  }
  return val;
};
