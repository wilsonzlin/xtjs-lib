import LinkedList, { LinkedListNode } from "./LinkedList";

export default async function* <T>(...iterables: AsyncIterable<T>[]) {
  const promises = new LinkedList<
    Promise<
      IteratorResult<T> & {
        iterator: AsyncIterator<T>;
        getNode(): LinkedListNode<any>;
      }
    >
  >();
  for (const iterable of iterables) {
    const iterator = iterable[Symbol.asyncIterator]();
    const node = promises.append(
      iterator.next().then((e) => ({ ...e, iterator, getNode: () => node }))
    );
  }
  while (!promises.isEmpty()) {
    const p = await Promise.race(promises);
    const n = p.getNode();
    if (p.done) {
      n.detach();
    } else {
      yield p.value;
      n.setValue(
        p.iterator
          .next()
          .then((e) => ({ ...e, iterator: p.iterator, getNode: p.getNode }))
      );
    }
  }
}
