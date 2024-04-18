export default <V, R>(
  it: Iterable<V>,
  mapper: (val: V) => R | undefined
): R | undefined => {
  for (const val of it) {
    const mapped = mapper(val);
    if (mapped !== undefined) {
      return mapped;
    }
  }
  return undefined;
};
