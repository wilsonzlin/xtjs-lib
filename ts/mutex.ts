type MutexHandle = {
  unlock: () => void;
};

export default () => {
  const waiting: ((h: MutexHandle) => void)[] = [];
  let locked = false;
  const pop = () => {
    const next = waiting.pop();
    if (!next) {
      return;
    }
    locked = true;
    next({
      unlock() {
        locked = false;
        pop();
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
        if (!locked) {
          pop();
        }
      });
    },
  };
};
