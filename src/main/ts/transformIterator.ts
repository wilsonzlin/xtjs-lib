export function transformIterator<I, O> (baseIter: Iterator<I>, transformer: (input: I) => O): IterableIterator<O> {
  return {
    next: (): IteratorResult<O> => {
      let nextEntry = baseIter.next();

      if (nextEntry.done) {
        return {
          done: true,
        } as IteratorResult<O>;
      }

      let nextValue = nextEntry.value;

      return {
        done: false,
        value: transformer(nextValue),
      };
    },

    [Symbol.iterator] (): IterableIterator<O> {
      return this;
    },
  };
}
