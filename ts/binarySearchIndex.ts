import nativeOrdering from "./nativeOrdering";

export default <T>(
  array: ArrayLike<T>,
  needle: T,
  comparator: (a: T, b: T) => number = nativeOrdering as any
): [boolean, number] => {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparison = comparator(array[mid], needle);
    if (comparison === 0) {
      return [true, mid];
    } else if (comparison < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return [false, low];
};
