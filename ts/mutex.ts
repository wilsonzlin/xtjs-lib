type MutexHandle = {
  unlock: () => void;
};

export default () => {
  const waiting: ((h: MutexHandle) => void)[] = [];
  let locked = false;

  const tryProgress = () => {
    if (locked) {
      return;
    }
    const next = waiting.shift();
    if (!next) {
      return;
    }
    locked = true;
    next({
      unlock() {
        locked = false;
        tryProgress();
      },
    });
  };

  return {
    isLocked() {
      return locked;
    },
    lock() {
      return new Promise<MutexHandle>((resolve) => {
        waiting.push(resolve);
        tryProgress();
      });
    },
  };
};
