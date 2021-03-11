import every from "./every";

export default function deepEquals(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  const typeA = typeof a;
  const typeB = typeof b;

  if (typeA != typeB) {
    return false;
  }

  // This handles direct comparisons between
  // undefined, null, strings, numbers, booleans, and functions
  // (although this function shouldn't be used to compare functions)
  if (a == null || typeA != "object") {
    // We already know a !== b.
    return false;
  }

  // This also works on arrays, but is inefficient. However, we shouldn't assume
  // that just because it has a "length" property it's an array-like.
  const keysA = new Set(Object.keys(a));
  const keysB = new Set(Object.keys(b));
  return (
    // WARNING: Object.keys([]) does not include "length" but [].hasOwnProperty("length") is true!
    // Therefore, we use set member testing instead of hasOwnProperty.
    every(keysA, (k) => keysB.has(k) && deepEquals(a[k], b[k])) &&
    every(keysB, (k) => keysA.has(k))
  );
}
