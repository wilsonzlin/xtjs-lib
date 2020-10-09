export const every = <T> (it: Iterable<T>, pred: (val: T) => boolean) => {
  for (const val of it) {
    if (!pred(val)) {
      return false;
    }
  }
  return true;
};
