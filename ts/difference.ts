export default function* <T>(a: Iterable<T>, b: Iterable<T>) {
  const bUniq = new Set(b);
  for (const aVal of a) {
    if (!bUniq.has(aVal)) {
      yield aVal;
    }
  }
}
