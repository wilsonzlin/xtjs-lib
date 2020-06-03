export const map = <I, O> (src: Iterator<I>, map: (input: I) => O): IterableIterator<O> => ({
  next: (): IteratorResult<O> => {
    const nextEntry = src.next();

    if (nextEntry.done) {
      return {
        done: true,
      } as IteratorResult<O>;
    }

    const nextValue = nextEntry.value;

    return {
      done: false,
      value: map(nextValue),
    };
  },

  [Symbol.iterator] (): IterableIterator<O> {
    return this;
  },
});
