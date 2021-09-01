// Do typeof check as isNaN returns true for non-number values.
const isNan = (val: unknown, typeofVal: string) =>
  typeofVal == "number" && isNaN(val as number);
const isArr = Array.isArray;
const isBuf = typeof Buffer == "function" ? Buffer.isBuffer : undefined;

export default function deepEquals(a: any, b: any): boolean {
  if (a == null || b == null) {
    return a === b;
  }
  const typeA = typeof a;
  const typeB = typeof b;
  // Check for NaN first as primitive checking will establish that NaN !== NaN.
  if (isNan(a, typeA) || isNan(b, typeB)) {
    return isNan(a, typeA) && isNan(b, typeB);
  }
  if (typeA != "object" || typeB != "object") {
    return a === b;
  }
  if (isArr(a) || isArr(b)) {
    return (
      isArr(a) &&
      isArr(b) &&
      a.length === b.length &&
      a.every((val, i) => deepEquals(val, b[i]))
    );
  }
  if (isBuf?.(a) || isBuf?.(b)) {
    return isBuf(a) && isBuf(b) && a.equals(b);
  }

  const keysA = Object.keys(a);
  const keysB = new Set(Object.keys(b));
  return (
    keysA.length === keysB.size &&
    // WARNING: Object.keys([]) does not include "length" but [].hasOwnProperty("length") is true!
    // Therefore, we use set member testing instead of hasOwnProperty.
    keysA.every((k) => keysB.has(k) && deepEquals(a[k], b[k]))
  );
}
