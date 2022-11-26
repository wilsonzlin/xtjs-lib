export default function* <V>(it: Iterator<V>, n: number): Generator<V> {
  for (let i = 0; i < n; i++) {
    const e = it.next();
    if (e.done) {
      return;
    }
    yield e.value;
  }
}
