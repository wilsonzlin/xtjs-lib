import assertState from "./assertState";

export default class Batcher<T, R> {
  private readonly q = Array<{
    resolve: (r: R) => void;
    input: T;
  }>();
  private flushing = false;

  constructor(
    private readonly fn: (vals: T[]) => Promise<R[]>,
    private readonly maxBatchSize?: number
  ) {}

  private async maybeFlush() {
    // We don't need to batch by timers (e.g. debounce), as if there is a lot of activity, it will be efficient because the subsequent batches will be optimally sized, and if there isn't, then it doesn't matter. OTOH, using a timer is far more complex and subtle.
    if (this.flushing) {
      return;
    }
    this.flushing = true;
    while (this.q.length) {
      // https://stackoverflow.com/a/48421425/6249022
      const dq = this.maxBatchSize
        ? this.q.splice(0, this.maxBatchSize)
        : this.q.splice(0);
      const outputs = await this.fn(dq.map((e) => e.input));
      assertState(outputs.length === dq.length);
      for (const [i, out] of outputs.entries()) {
        dq[i].resolve(out);
      }
    }
    this.flushing = false;
  }

  public async execute(input: T) {
    return new Promise<R>((resolve) => {
      this.q.push({ resolve, input });
      // Intentionally do not wait for Promise. The function is async just so we can use `await` in it.
      void this.maybeFlush();
    });
  }
}
