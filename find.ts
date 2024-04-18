export default <V>(
  it: Iterable<V>,
  pred: (val: V) => boolean
): V | undefined => {
  for (const val of it) {
    if (pred(val)) {
      return val;
    }
  }
  return undefined;
};
