export default class Dict<K, V> implements Map<K, V> {
  private readonly map: Map<K, V>;

  constructor(entries?: Iterable<readonly [K, V]>) {
    this.map = entries ? new Map(entries) : new Map();
  }

  clear(): void {
    this.map.clear();
  }

  computeIfAbsent(key: K, provider: (key: K) => V): V {
    if (!this.map.has(key)) {
      this.map.set(key, provider(key));
    }
    return this.map.get(key)!;
  }

  containsKey(key: K): boolean {
    return this.map.has(key);
  }

  entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  getOrThrow(key: K): V {
    if (!this.map.has(key)) {
      throw new ReferenceError("Key does not exist");
    }
    return this.map.get(key)!;
  }

  getOrDefault(key: K, def: V): V {
    return !this.map.has(key) ? def : this.map.get(key)!;
  }

  isEmpty() {
    return !this.map.size;
  }

  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  put(key: K, value: V): V | undefined {
    const old = this.map.get(key);
    this.map.set(key, value);
    return old;
  }

  putIfAbsentOrThrow(key: K, value: V): this {
    if (this.map.has(key)) {
      throw new ReferenceError(`Key already exists`);
    }
    this.map.set(key, value);
    return this;
  }

  remove(key: K): V | undefined {
    const old = this.map.get(key);
    this.map.delete(key);
    return old;
  }

  get size() {
    return this.map.size;
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  readonly [Symbol.toStringTag] = "extlib.Dict";

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  forEach(cb: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    return this.map.forEach(cb, thisArg);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  set(key: K, value: V): this {
    this.map.set(key, value);
    return this;
  }
}
