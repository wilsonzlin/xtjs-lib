import isSubset from './isSubset';

export default (a: object, b: object, keys: any[]) =>
  isSubset(keys, Object.keys(a)) &&
  isSubset(keys, Object.keys(b)) &&
  keys.every(k => a[k] === b[k])
