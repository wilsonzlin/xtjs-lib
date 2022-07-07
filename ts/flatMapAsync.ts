export default async function* <T, R>(
  it: Iterable<T> | AsyncIterable<T>,
  mapper: (
    val: T
  ) =>
    | Iterable<R>
    | AsyncIterable<R>
    | Promise<Iterable<R>>
    | Promise<AsyncIterable<R>>
): AsyncGenerator<R, any, any> {
  for await (const val of it) {
    yield* await mapper(val);
  }
}
