export default function* <T>(it: Iterable<T>, joiner: T) {
  let first = true;
  for (const val of it) {
    if (!first) {
      yield joiner;
    }
    first = false;
    yield val;
  }
}
