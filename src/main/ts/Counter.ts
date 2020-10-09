import Dict from './Dict';

export default class Counter<V> {
  private readonly counts: Dict<V, number> = new Dict();

  adjust (val: V, diff: number): this {
    this.counts.put(val, this.counts.getOrDefault(val, 0) + diff);
    return this;
  }

  increment (val: V): this {
    return this.adjust(val, 1);
  }

  decrement (val: V): this {
    return this.adjust(val, -1);
  }

  get (val: V): number {
    return this.counts.getOrDefault(val, 0);
  }

  set (val: V, count: number): this {
    this.counts.put(val, count);
    return this;
  }
}
