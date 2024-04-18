type TaskState = {
  resolve: Function;
  reject: Function;
  provider: () => Promise<any>;
};

export default class Semaphore {
  private readonly tasks: TaskState[] = [];
  private active = 0;

  // Don't use os.cpus().length as default as this class could be used in a browser.
  constructor(private readonly concurrency: number) {}

  add = <T>(provider: () => Promise<T>) =>
    new Promise<T>((resolve, reject) => {
      this.tasks.push({ resolve, reject, provider });
      this._start();
    });

  clear = () => {
    this.tasks.splice(0);
  };

  private _start = () => {
    let t: TaskState;
    if (this.active >= this.concurrency || !(t = this.tasks.shift()!)) {
      return;
    }
    this.active++;
    t.provider()
      .then(
        (r) => t.resolve(r),
        (e) => t.reject(e)
      )
      .finally(() => {
        this.active--;
        this._start();
      });
  };
}
