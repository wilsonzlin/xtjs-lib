export default async <V>(
  it: Iterable<V> | AsyncIterable<V>,
  pred: (val: V) => boolean | Promise<boolean>
): Promise<V | undefined> => {
  for await (const val of it) {
    if (await pred(val)) {
      return val;
    }
  }
  return undefined;
};
