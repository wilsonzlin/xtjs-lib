export class JMap<K, V> {
  private readonly map: Map<K, V> = new Map();

  clear (): void {
    this.map.clear();
  }

  computeIfAbsent (key: K, provider: (key: K) => V): V {
    if (!this.map.has(key)) {
      this.map.set(key, provider(key));
    }
    return this.map.get(key)!;
  }

  containsKey (key: K): boolean {
    return this.map.has(key);
  }

  entries (): Iterable<[K, V]> {
    return this.map.entries();
  }

  get (key: K): V | undefined {
    return this.map.get(key);
  }

  getOrThrow (key: K): V {
    if (!this.map.has(key)) {
      throw new ReferenceError('Key does not exist');
    }
    return this.map.get(key)!;
  }

  getOrDefault (key: K, def: V): V {
    return !this.map.has(key) ? def : this.map.get(key)!;
  }

  isEmpty () {
    return !this.map.size;
  }

  keys (): Iterable<K> {
    return this.map.keys();
  }

  put (key: K, value: V): V | undefined {
    const old = this.map.get(key);
    this.map.set(key, value);
    return old;
  }

  remove (key: K): V | undefined {
    const old = this.map.get(key);
    this.map.delete(key);
    return old;
  }

  size () {
    return this.map.size;
  }

  values (): Iterable<V> {
    return this.map.values();
  }
}
