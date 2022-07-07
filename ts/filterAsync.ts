export default async function* <T>(
  it: Iterable<T> | AsyncIterable<T>,
  pred: (val: T) => boolean | Promise<boolean>
): AsyncGenerator<T, void, void> {
  for await (const val of it) {
    if (await pred(val)) {
      yield val;
    }
  }
}
