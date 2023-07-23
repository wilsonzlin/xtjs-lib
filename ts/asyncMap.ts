export default async function* <T, R>(
  seq: AsyncIterable<T>,
  mapper: (v: T) => Promise<R>
) {
  for await (const v of seq) {
    yield await mapper(v);
  }
}
