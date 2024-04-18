import assertState from "./assertState";
import Semaphore from "./Semaphore";

export default class Batcher<T, R> {
  private readonly q = Array<{
    resolve: (r: R) => void;
    input: T;
  }>();

  constructor(
    private readonly fn: (vals: T[]) => Promise<R[]>,
    // By asking for a Semaphore instead of simply a concurrency number, this Batcher's concurrency can be shared with other things (in a naive first-come-first-served way).
    private readonly concurrency = new Semaphore(1),
    private readonly maxBatchSize?: number
  ) {}

  public async execute(input: T) {
    return new Promise<R>((resolve) => {
      this.q.push({ resolve, input });
      // We don't need to batch by timers (e.g. debounce), as if there is a lot of activity, it will be efficient because the subsequent batches will be optimally sized, and if there isn't, then it doesn't matter. OTOH, using a timer is far more complex and subtle.
      // Intentionally do not wait for Promise.
      void this.concurrency.add(async () => {
        // https://stackoverflow.com/a/48421425/6249022
        const dq = this.maxBatchSize
          ? this.q.splice(0, this.maxBatchSize)
          : this.q.splice(0);
        const outputs = await this.fn(dq.map((e) => e.input));
        assertState(outputs.length === dq.length);
        for (const [i, out] of outputs.entries()) {
          dq[i].resolve(out);
        }
      });
    });
  }
}
