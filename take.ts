import intoIterator from "./intoIterator";

export default function* <V>(
  src: Iterable<V> | Iterator<V>,
  n: number
): Generator<V> {
  const it = intoIterator(src);
  for (let i = 0; i < n; i++) {
    const e = it.next();
    if (e.done) {
      return;
    }
    yield e.value;
  }
}
