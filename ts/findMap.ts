export default <V, R>(
  it: Iterable<V>,
  mapper: (val: V) => R
): R | undefined => {
  for (const val of it) {
    const mapped = mapper(val);
    if (mapped) {
      return mapped;
    }
  }
  return undefined;
};
