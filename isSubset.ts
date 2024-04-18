import every from "./every";

export default <T>(sub: Iterable<T>, full: Set<T> | T[]) =>
  every(sub, (val) =>
    Array.isArray(full) ? full.includes(val) : full.has(val)
  );
