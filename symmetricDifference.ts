export default function* <T>(a: Iterable<T>, b: Iterable<T>) {
  const aUniq = new Set(a);
  const bUniq = new Set(b);
  for (const e of aUniq) {
    if (!bUniq.has(e)) {
      yield e;
    }
  }
  for (const e of bUniq) {
    if (!aUniq.has(e)) {
      yield e;
    }
  }
}
