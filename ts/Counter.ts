import Dict from "./Dict";
import filter from "./filter";

export default class Counter<V> {
  private readonly map: Dict<V, number>;

  constructor(init?: Iterable<readonly [V, number]>) {
    this.map = new Dict(init);
  }

  adjust(val: V, diff: number): this {
    this.map.put(val, this.map.getOrDefault(val, 0) + diff);
    return this;
  }

  entries(): Iterator<[V, number]> {
    return this.map.entries();
  }

  positiveEntries(): Iterator<[V, number]> {
    return filter(this.map.entries(), ([_, count]) => count > 0);
  }

  values(): Iterator<V> {
    return this.map.keys();
  }

  counts(): Iterator<number> {
    return this.map.values();
  }

  increment(val: V): this {
    return this.adjust(val, 1);
  }

  decrement(val: V): this {
    return this.adjust(val, -1);
  }

  get(val: V): number {
    return this.map.getOrDefault(val, 0);
  }

  set(val: V, count: number): this {
    this.map.put(val, count);
    return this;
  }
}
