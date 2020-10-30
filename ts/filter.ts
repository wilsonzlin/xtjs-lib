export default function* <T>(it: Iterable<T>, pred: (val: T) => boolean) {
  for (const val of it) {
    if (pred(val)) {
      yield val;
    }
  }
}
