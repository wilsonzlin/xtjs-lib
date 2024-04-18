export default async function* <T, R>(
  it: Iterable<T> | AsyncIterable<T>,
  mapper: (val: T) => R | Promise<R>
): AsyncGenerator<R, void, void> {
  for await (const val of it) {
    yield await mapper(val);
  }
}
