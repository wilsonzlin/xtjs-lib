import assertExists from "./assertExists";
import assertNonNegative from "./assertNonNegative";

export default () => {
  let pending = 0;
  let resolver: () => void;
  let rejecter: (err?: any) => void;
  return Object.assign(
    new Promise<void>((resolve, reject) => {
      resolver = resolve;
      rejecter = reject;
    }),
    {
      done: () => {
        if (!assertNonNegative(--pending)) {
          assertExists(resolver)();
        }
      },
      add: (count: number = 1) => (pending += count),
      error: (err: Error) => assertExists(rejecter)(err),
    }
  );
};
