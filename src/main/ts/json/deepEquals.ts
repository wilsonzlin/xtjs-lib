export function deepEquals (a: any, b: any): boolean {
  let typeof_a = typeof a;
  let typeof_b = typeof b;

  if (typeof_a != typeof_b) {
    return false;
  }

  // This handles direct comparisons between
  // undefined, null, strings, numbers, booleans, and functions
  // (although this function shouldn't be used to compare functions)
  if (a == null || typeof_a != "object") {
    return a === b;
  }

  if (typeof a.length == "number") {
    return typeof b.length == "number" &&
      a.length == b.length &&
      Array.prototype.every.call(a, (v: any, i: number) => deepEquals(v, b[i]));
  }

  // Plain object
  return Object.getPrototypeOf(a) === Object.getPrototypeOf(b) &&
    Object.keys(a).every(k => Object.hasOwnProperty.call(a, k) && deepEquals(a[k], b[k])) &&
    Object.keys(b).every(k => Object.hasOwnProperty.call(b, k));
}
