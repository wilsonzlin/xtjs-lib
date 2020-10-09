export default class Countdown {
  private started: number;
  private paused?: number = undefined;
  private readonly durationMs: number;
  private complete: boolean = false;
  private timeoutID?: any = undefined;
  private readonly callbackQueue: Function[] = [];

  constructor (durationMs: number) {
    if (durationMs < 1) {
      throw new TypeError(`Invalid duration`);
    }
    this.started = Date.now();
    this.durationMs = durationMs;
    this.resume();
  }

  resume (): this {
    if (this.timeoutID !== undefined) {
      throw new TypeError(`Timer already running`);
    }
    if (this.complete) {
      throw new TypeError(`Timer already complete`);
    }

    this.timeoutID = setTimeout(() => {
      this._complete();
    }, this.paused === undefined ? this.durationMs : (this.started + this.durationMs - this.paused));

    return this;
  }

  pause (): this {
    if (this.timeoutID === undefined) {
      throw new TypeError(`Timer already paused`);
    }
    if (this.complete) {
      throw new TypeError(`Timer already complete`);
    }

    this.paused = Date.now();
    clearTimeout(this.timeoutID);
    this.timeoutID = undefined;

    return this;
  }

  reset (): this {
    if (this.complete) {
      throw new TypeError(`Timer already complete`);
    }

    this.started = Date.now();
    if (this.paused !== undefined) {
      // Currently paused
      this.paused = Date.now();
    } else {
      // Currently running
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        this._complete();
      }, this.durationMs);
    }

    return this;
  }

  then (callback: Function): this {
    this.callbackQueue.push(callback);
    return this;
  }

  private _complete (): void {
    this.complete = true;
    this.callbackQueue.forEach(c => c());
  }
}
