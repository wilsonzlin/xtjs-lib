type MutexHandle = {
  unlock: () => void;
};

export default class Mutex {
  private chain: Promise<void> = Promise.resolve();

  readonly lock = () =>
    new Promise<MutexHandle>((resolve) => {
      let unlock: () => void;
      const oldChain = this.chain;
      this.chain = new Promise<void>((resolve) => {
        unlock = resolve;
      });
      oldChain.then(() =>
        resolve({
          unlock,
        })
      );
    });
}
