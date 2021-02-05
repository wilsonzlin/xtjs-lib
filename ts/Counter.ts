import Dict from "./Dict";
import filter from "./filter";

export default class Counter<V> {
  private readonly counts: Dict<V, number>;

  constructor(init?: Iterable<[V, number]>) {
    this.counts = new Dict(init);
  }

  adjust(val: V, diff: number): this {
    this.counts.put(val, this.counts.getOrDefault(val, 0) + diff);
    return this;
  }

  entries(): Iterator<[V, number]> {
    return filter(this.counts.entries(), ([_, count]) => count > 0);
  }

  increment(val: V): this {
    return this.adjust(val, 1);
  }

  decrement(val: V): this {
    return this.adjust(val, -1);
  }

  get(val: V): number {
    return this.counts.getOrDefault(val, 0);
  }

  set(val: V, count: number): this {
    this.counts.put(val, count);
    return this;
  }
}
