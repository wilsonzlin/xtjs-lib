const FILTERED = Symbol('filtered AsyncArray element');

type FilteredElement = typeof FILTERED;

const isNotFilteredElement = <T> (elem: T | FilteredElement): elem is T => elem !== FILTERED;

const promisifyValue = <V> (val: V | Promise<V>): Promise<V> => Promise.resolve(val);

// Two main characteristics:
// 1. Takes asynchronous functions for operating on arrays.
// 2. Operates on arrays concurrently.
// For example:
// .map maps values to a potential value, and calls the mapping function on elements non-deterministically.
// .some/.every takes asynchronous predicates and races value Promises for first to pass/fail predicate, not necessarily most initial in position.
export class AsyncArray<T> {
  private readonly elements: Promise<T | FilteredElement>[];

  private constructor (from: Iterable<Promise<T | FilteredElement>>) {
    this.elements = [...from];
  }

  static from<T> (from: Iterable<T | Promise<T>>) {
    return new AsyncArray(Array.from(from, promisifyValue));
  }

  private next<N> (fn: (val: T) => Promise<N | FilteredElement>) {
    return new AsyncArray<N>(this.elements.map(async (val) => {
      const resolved = await val;
      return resolved !== FILTERED ? fn(resolved) : FILTERED;
    }));
  }

  async toArray (): Promise<T[]> {
    return (await Promise.all(this.elements)).filter(isNotFilteredElement);
  }

  concat (...vals: (T | Promise<T> | T[] | Promise<T>[])[]): AsyncArray<T> {
    return new AsyncArray<T>(this.elements.concat(...vals.map(val => Array.isArray(val) ? (val as any).map(promisifyValue) : promisifyValue(val))));
  }

  forEach (iterator: (val: T) => void): void {
    this.elements.forEach(async (val) => {
      const resolved = await val;
      if (isNotFilteredElement(resolved)) {
        iterator(resolved);
      }
    });
  }

  async every (predicate: (val: T) => Promise<boolean>): Promise<boolean> {
    // Use .some for short-circuiting behaviour.
    return !(await this.some(async (val) => !(await predicate(val))));
  }

  some (predicate: (val: T) => Promise<boolean>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let remaining = this.elements.length;
      this.elements.forEach(async (val) => {
        try {
          const resolved = await val;
          if (isNotFilteredElement(resolved) && await predicate(resolved)) {
            resolve(true);
          }
        } catch (e) {
          reject(e);
        }
        if (--remaining == 0) {
          resolve(false);
        }
      });
    });
  }

  map<M> (mapper: (val: T) => Promise<M>): AsyncArray<M> {
    return this.next(mapper);
  }

  filter (predicate: (val: T) => Promise<boolean>): AsyncArray<T> {
    return this.next(async (elem) => (await predicate(elem)) ? elem : FILTERED);
  }

  push (...vals: (T | Promise<T>)[]): number {
    return this.elements.push(...vals.map(promisifyValue));
  }

  async pop (): Promise<T | undefined> {
    let popped;
    while ((popped = await this.elements.pop()) === FILTERED) {
    }
    return popped;
  }

  unshift (vals: (T | Promise<T>)[]): number {
    return this.elements.unshift(...vals.map(promisifyValue));
  }

  async shift (): Promise<T | undefined> {
    let shifted;
    while ((shifted = await this.elements.shift()) === FILTERED) {
    }
    return shifted;
  }
}
