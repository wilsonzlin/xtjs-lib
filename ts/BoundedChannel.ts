import assertExists from "./assertExists";
import assertState from "./assertState";

export default class BoundedChannel<T> {
  private readonly backlog = Array<T>();
  private readonly sendWaiters = Array<() => void>();
  private readonly recvWaiters = Array<() => void>();

  constructor(readonly limit: number) {}

  async send(v: T) {
    if (this.backlog.length >= this.limit) {
      await new Promise<void>((resolve) => this.sendWaiters.push(resolve));
    }
    assertState(this.backlog.length < this.limit);
    this.backlog.push(v);
    this.recvWaiters.shift()?.();
  }

  async recv(): Promise<T> {
    if (!this.backlog.length) {
      await new Promise<void>((resolve) => this.recvWaiters.push(resolve));
    }
    this.sendWaiters.shift()?.();
    return assertExists(this.backlog.shift());
  }
}
