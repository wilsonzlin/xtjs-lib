export default function <T, E extends T> (it: Iterable<T>, pred: (val: T) => val is E): it is Iterable<E>;
export default function <T, E extends T> (it: Set<T>, pred: (val: T) => val is E): it is Set<E>;
export default function <T, E extends T> (it: T[], pred: (val: T) => val is E): it is E[];
export default function <T> (it: Iterable<T>, pred: (val: T) => boolean): boolean;
export default function <T> (it: Iterable<T>, pred: (val: T) => boolean): boolean {
  for (const val of it) {
    if (!pred(val)) {
      return false;
    }
  }
  return true;
}
