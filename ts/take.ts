export default function* <V>(it: Iterator<V>, n: number): Generator<V> {
  for (let i = 0; i < n; i++) {
    yield it.next().value;
  }
}
