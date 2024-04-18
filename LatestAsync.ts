export default class LatestAsync {
  private currentInvokeId: number = 0;

  readonly onlyLatest = <T>(promise: Promise<T>): Promise<T> =>
    new Promise((resolve, reject) => {
      const invokeId = ++this.currentInvokeId;
      let error: any, result: any;
      promise
        .then(
          (r) => (result = r),
          (e) => (error = e)
        )
        .then(() => {
          if (invokeId === this.currentInvokeId) {
            if (error !== undefined) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        });
    });

  readonly cancelAll = (): void => {
    this.currentInvokeId++;
  };
}
