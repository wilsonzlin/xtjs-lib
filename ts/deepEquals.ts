const dualCmp = <T>(
  chk: (val: unknown) => val is T,
  add: (a: T, b: T) => boolean
) => (a: unknown, b: unknown) => {
  if (chk(a) || chk(b)) {
    return chk(a) && chk(b) && add(a, b);
  }
  return undefined;
};

const arrayEq = dualCmp(
  Array.isArray,
  (a, b) => a.length === b.length && a.every((val, i) => deepEquals(val, b[i]))
);

const bufferEq =
  typeof Buffer == "function"
    ? dualCmp(Buffer.isBuffer, (a, b) => a.equals(b))
    : undefined;

const nanEq = dualCmp(
  // Do typeof check as isNaN returns true for non-number values.
  (val): val is number => typeof val == "number" && isNaN(val),
  () => true
);

const primEq = dualCmp(
  (
    val
  ): val is
    | bigint
    | boolean
    | Function
    | null
    | number
    | string
    | symbol
    | undefined => typeof val != "object" || val == null,
  (a, b) => a === b
);

const propsEq = (a: object, b: object) => {
  const keysA = Object.keys(a);
  const keysB = new Set(Object.keys(b));
  return (
    keysA.length === keysB.size &&
    // WARNING: Object.keys([]) does not include "length" but [].hasOwnProperty("length") is true!
    // Therefore, we use set member testing instead of hasOwnProperty.
    keysA.every((k) => keysB.has(k) && deepEquals(a[k], b[k]))
  );
};

export default function deepEquals(a: any, b: any): boolean {
  // Check for NaN first as primitive checking will establish that NaN !== NaN.
  return (
    nanEq(a, b) ??
    primEq(a, b) ??
    arrayEq(a, b) ??
    bufferEq?.(a, b) ??
    propsEq(a, b)
  );
}
