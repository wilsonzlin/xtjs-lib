import {Duration} from 'time/Duration';

export default class Countdown {
  private started: number;
  private paused?: number = undefined;
  private readonly duration: number;
  private complete: boolean = false;
  private timeoutID?: any = undefined;
  private readonly callbackQueue: Function[] = [];

  constructor (duration: Duration) {
    if (duration < 1) {
      throw new TypeError(`Invalid duration`);
    }
    this.started = Date.now();
    this.duration = duration;
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
    }, this.paused === undefined ? this.duration : (this.started + this.duration - this.paused));

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
      }, this.duration);
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
