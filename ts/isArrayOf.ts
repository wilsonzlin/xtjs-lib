export default <T>(arr: unknown[], pred: (e: unknown) => e is T): arr is T[] =>
  Array.isArray(arr) && arr.every(pred);
