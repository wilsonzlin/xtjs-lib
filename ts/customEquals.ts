export default <T>(...keys: ((val: T) => any)[]) =>
  (a: T, b: T) =>
    keys.every((k) => k(a) === k(b));
