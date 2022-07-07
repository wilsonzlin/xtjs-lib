export default function* <T, R>(
  it: Iterable<T>,
  mapper: (val: T) => Iterable<R>
): Generator<R, any, any> {
  for (const val of it) {
    yield* mapper(val);
  }
}
