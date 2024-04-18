export default function* <T, R>(it: Iterable<T>, mapper: (val: T) => R) {
  for (const val of it) {
    yield mapper(val);
  }
}
