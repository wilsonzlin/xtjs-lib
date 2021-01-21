export default function* <V>(it: Iterator<V>, n: number) {
  for (let i = 0; i < n; i++) {
    yield it.next().value;
  }
}
