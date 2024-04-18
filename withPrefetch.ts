import assertExists from "./assertExists";
import assertState from "./assertState";

export default async function* <T>(n: number, seq: AsyncIterable<T>) {
  assertState(n > 0);
  const it = seq[Symbol.asyncIterator]();
  let done = false;
  const buffer = Array<Promise<IteratorResult<T, unknown>>>();
  let fetching = false;
  const maybeFetch = async () => {
    if (fetching) {
      return;
    }
    fetching = true;
    while (buffer.length < n && !done) {
      const next = it.next();
      buffer.push(next);
      const e = await next;
      if (e.done) {
        done = true;
      }
    }
    fetching = false;
  };
  while (true) {
    maybeFetch();
    if (done) {
      break;
    }
    const e = await assertExists(buffer.shift());
    if (e.done) {
      break;
    }
    yield e.value;
  }
}
