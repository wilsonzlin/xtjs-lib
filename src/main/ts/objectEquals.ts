import hasSameKeys from './hasSameKeys';

export default (a: object, b: object) => hasSameKeys(a, b) &&
  Object.keys(a).every(k => a[k] === b[k]);
