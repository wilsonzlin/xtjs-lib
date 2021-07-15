export default function <A, B>(
  a: Iterable<A>,
  b: Iterable<B>
): Generator<[A, B]>;
export default function <A, B, C>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>
): Generator<[A, B, C]>;
export default function <A, B, C, D>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>
): Generator<[A, B, C, D]>;
export default function <A, B, C, D, E>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>
): Generator<[A, B, C, D, E]>;
export default function <A, B, C, D, E, F>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
  f: Iterable<F>
): Generator<[A, B, C, D, E, F]>;
export default function <A, B, C, D, E, F, G>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
  f: Iterable<F>,
  g: Iterable<G>
): Generator<[A, B, C, D, E, F, G]>;
export default function <A, B, C, D, E, F, G, H>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
  f: Iterable<F>,
  g: Iterable<G>,
  h: Iterable<H>
): Generator<[A, B, C, D, E, F, G, H]>;
export default function <A, B, C, D, E, F, G, H, I>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
  f: Iterable<F>,
  g: Iterable<G>,
  h: Iterable<H>,
  i: Iterable<I>
): Generator<[A, B, C, D, E, F, G, H, I]>;
export default function <A, B, C, D, E, F, G, H, I, J>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
  f: Iterable<F>,
  g: Iterable<G>,
  h: Iterable<H>,
  i: Iterable<I>,
  j: Iterable<J>
): Generator<[A, B, C, D, E, F, G, H, I, J]>;
export default function <A, B, C, D, E, F, G, H, I, J, K>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
  f: Iterable<F>,
  g: Iterable<G>,
  h: Iterable<H>,
  i: Iterable<I>,
  j: Iterable<J>,
  k: Iterable<K>
): Generator<[A, B, C, D, E, F, G, H, I, J, K]>;
export default function* (...its: Iterable<any>[]): Generator<any[]> {
  const iterators = its.map((it) => it[Symbol.iterator]());
  while (true) {
    const gen = [];
    for (const it of iterators) {
      const elem = it.next();
      if (elem.done) {
        return;
      }
      gen.push(elem.value);
    }
    yield gen;
  }
}
