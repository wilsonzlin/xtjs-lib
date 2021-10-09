import Dict from "./Dict";
import filter from "./filter";

export default class Counter<V> {
  private readonly map: Dict<V, number>;

  constructor(init?: Iterable<[V, number]>) {
    this.map = new Dict(init);
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
