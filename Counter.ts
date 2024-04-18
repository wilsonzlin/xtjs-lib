import Dict from "./Dict";
import filter from "./filter";

export default class Counter<V> {
  private readonly map: Dict<V, number>;

  constructor(init?: Iterable<readonly [V, number]>) {
    this.map = new Dict(init);
  }

  static count<T, K>(elems: Iterable<T>, key: (val: T) => K) {
    const counter = new Counter<K>();
    for (const elem of elems) {
      counter.increment(key(elem));
    }
    return counter;
  }

  adjust(val: V, diff: number) {
    const newCount = this.map.getOrDefault(val, 0) + diff;
    this.map.put(val, newCount);
    return newCount;
  }

  entries() {
    return this.map.entries();
  }

  positiveEntries() {
    return filter(this.map.entries(), ([_, count]) => count > 0);
  }

  values() {
    return this.map.keys();
  }

  counts() {
    return this.map.values();
  }

  increment(val: V) {
    return this.adjust(val, 1);
  }

  decrement(val: V) {
    return this.adjust(val, -1);
  }

  get(val: V) {
    return this.map.getOrDefault(val, 0);
  }

  set(val: V, count: number) {
    this.map.put(val, count);
    return this;
  }

  [Symbol.iterator]() {
    return this.map[Symbol.iterator]();
  }
}
