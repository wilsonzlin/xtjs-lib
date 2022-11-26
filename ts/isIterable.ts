export default <V>(v: unknown): v is Iterable<V> => {
  if (typeof v == "string") {
    return true;
  }
  if (typeof v == "object" && v) {
    return Symbol.iterator in v;
  }
  return false;
};
