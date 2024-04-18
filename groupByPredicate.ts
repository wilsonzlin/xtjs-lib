export default <T>(
  vals: Iterable<T>,
  pred: (val: T) => boolean
): [T[], T[]] => {
  const passed = [];
  const failed = [];
  for (const val of vals) {
    if (pred(val)) {
      passed.push(val);
    } else {
      failed.push(val);
    }
  }
  return [passed, failed];
};
