export default function* <T>(...iterables: Iterable<T>[]) {
  for (const it of iterables) {
    yield* it;
  }
}
