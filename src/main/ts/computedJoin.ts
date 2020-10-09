const DUMMY = {};

export default function* <T> (it: Iterable<T>, joinProducer: (l: T, r: T) => T) {
  let left: T = DUMMY as any;
  for (const val of it) {
    if (left !== DUMMY) {
      yield joinProducer(left, val);
    }
    left = val;
    yield val;
  }
}
