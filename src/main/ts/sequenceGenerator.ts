export default function <T> (length: number, producer: (prev: T, i: number) => T, first: T): Generator<T>;
export default function <T> (length: number, producer: (prev: T | undefined, i: number) => T): Generator<T>;
export default function* <T> (length: number, producer: (prev: T | undefined, i: number) => T, first?: T) {
  let prev = first;
  for (let i = 0; i < length; i++) {
    prev = producer(prev, i);
    yield prev;
  }
}
