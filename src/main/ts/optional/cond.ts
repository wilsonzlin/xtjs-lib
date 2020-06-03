export const ifDefined = <T> (val: T | undefined, fn: (val: T) => void) => {
  if (val !== undefined) {
    fn(val);
  }
};
