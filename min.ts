import Comparator from "./Comparator";
import nativeOrdering from "./nativeOrdering";

export default <T>(
  vals: Iterable<T>,
  comparator: Comparator<T> = nativeOrdering as any
): T => {
  let min: T;
  let set = false;
  for (const val of vals) {
    // @ts-ignore Use before assignment.
    if (!set || comparator(val, min) < 0) {
      min = val;
    }
    set = true;
  }
  if (!set) {
    throw new Error(`No values provided by iterable`);
  }
  // @ts-ignore Use before assignment.
  return min;
};
