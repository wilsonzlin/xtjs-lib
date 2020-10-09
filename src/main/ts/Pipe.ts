export default class Pipe<V> {
  constructor (
    private readonly value: V,
  ) {
  }

  map<R> (mapper: (val: V, ...args: any[]) => R, ...args: any[]): Pipe<R> {
    return new Pipe(mapper(this.value, ...args));
  }

  async asyncMap<R> (mapper: (val: V, ...args: any[]) => Promise<R>, ...args: any[]): Promise<Pipe<R>> {
    return new Pipe(await mapper(this.value, ...args));
  }
}
