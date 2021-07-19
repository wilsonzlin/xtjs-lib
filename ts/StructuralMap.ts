import findAndRemove from "./findAndRemove";

export type Key = {
  equals(other: unknown): boolean;
  hashCode(): HashCode;
};

export type HashCode = bigint | number | string;

class Pair<K extends Key, V> {
  constructor(public key: K, public value: V) {}
}

const EMPTY_ARRAY: any[] = [];

export default class StructuralMap<K extends Key, V> implements Map<K, V> {
  readonly [Symbol.toStringTag]: string = "xtjs-lib.StructuralMap";
  private readonly map = new Map<HashCode, Pair<K, V>[]>();

  private _size = 0;

  get size(): number {
    return this._size;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  clear(): void {
    this.map.clear();
    this._size = 0;
  }

  delete(key: K): boolean {
    const hc = key.hashCode();
    const pairs = this.map.get(hc) ?? EMPTY_ARRAY;
    const deleted = findAndRemove(pairs, (p) => key.equals(p.key));
    if (deleted) {
      this._size--;
    }
    return !!deleted;
  }

  *entries(): IterableIterator<[K, V]> {
    for (const pairs of this.map.values()) {
      for (const pair of pairs) {
        yield [pair.key, pair.value];
      }
    }
  }

  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void {
    for (const [key, value] of this.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  get(key: K): V | undefined {
    const hc = key.hashCode();
    const pairs = this.map.get(hc) ?? EMPTY_ARRAY;
    return pairs.find((p) => key.equals(p.key))?.value;
  }

  has(key: K): boolean {
    const hc = key.hashCode();
    const pairs = this.map.get(hc) ?? EMPTY_ARRAY;
    return !!pairs.find((p) => key.equals(p.key));
  }

  *keys(): IterableIterator<K> {
    for (const pairs of this.map.values()) {
      for (const pair of pairs) {
        yield pair.key;
      }
    }
  }

  set(key: K, value: V): this {
    const hc = key.hashCode();
    let pairs = this.map.get(hc);
    if (!pairs) {
      this.map.set(hc, (pairs = []));
    }
    const pair = pairs.find((p) => key.equals(p.key));
    if (!pair) {
      pairs.push(new Pair(key, value));
      this._size++;
    } else {
      pair.value = value;
    }
    return this;
  }

  *values(): IterableIterator<V> {
    for (const pairs of this.map.values()) {
      for (const pair of pairs) {
        yield pair.value;
      }
    }
  }
}
