type MutexHandle = {
  unlock: () => void;
};

export default class Mutex {
  private readonly waiting: ((h: MutexHandle) => void)[] = [];
  private locked = false;

  private readonly tryProgress = () => {
    if (this.locked) {
      return;
    }
    const next = this.waiting.shift();
    if (!next) {
      return;
    }
    this.locked = true;
    next({
      unlock: () => {
        this.locked = false;
        this.tryProgress();
      },
    });
  };

  readonly isLocked = () => this.locked;

  readonly lock = () =>
    new Promise<MutexHandle>((resolve) => {
      this.waiting.push(resolve);
      this.tryProgress();
    });
}
