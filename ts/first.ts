export default <V>(it: Iterable<V>): V | undefined => {
  for (const v of it) {
    return v;
  }
  return undefined;
};
