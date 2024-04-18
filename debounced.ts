export default <T extends (...args: any[]) => void>(
  fn: T,
  delayMs: number,
  maxDelayMs: number = Infinity
): {
  cancel: () => void;
  function: T;
} => {
  let lastId: ReturnType<typeof setTimeout> | undefined = undefined;
  let sequenceStarted: number | undefined = undefined;
  return {
    cancel: () => clearTimeout(lastId as any),
    function: function (this: any) {
      const now = Date.now();
      const cb = () => {
        fn.apply(this, arguments as any);
        sequenceStarted = undefined;
      };
      clearTimeout(lastId as any);
      if (sequenceStarted == undefined) {
        sequenceStarted = now;
        lastId = setTimeout(cb, delayMs);
      } else if (now - sequenceStarted <= maxDelayMs) {
        lastId = setTimeout(cb, delayMs);
      } else {
        cb();
      }
    } as any,
  };
};
