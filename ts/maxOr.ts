import Comparator from "./Comparator";
import maxOrElse from "./maxOrElse";
import nativeOrdering from "./nativeOrdering";

export default <T>(
  vals: Iterable<T>,
  ifEmpty: T,
  comparator: Comparator<T> = nativeOrdering as any
): T => maxOrElse(vals, () => ifEmpty, comparator);
