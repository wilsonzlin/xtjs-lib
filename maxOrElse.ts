import Comparator from "./Comparator";
import nativeOrdering from "./nativeOrdering";

export default <T>(
  vals: Iterable<T>,
  ifEmpty: () => T,
  comparator: Comparator<T> = nativeOrdering as any
): T => {
  let max: T;
  let set = false;
  for (const val of vals) {
    // @ts-ignore Use before assignment.
    if (!set || comparator(val, max) > 0) {
      max = val;
    }
    set = true;
  }
  if (!set) {
    return ifEmpty();
  }
  // @ts-ignore Use before assignment.
  return max;
};
