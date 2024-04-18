import Comparator from "./Comparator";
import maxOrElse from "./maxOrElse";
import nativeOrdering from "./nativeOrdering";

export default <T>(
  vals: Iterable<T>,
  comparator: Comparator<T> = nativeOrdering as any
): T =>
  maxOrElse(
    vals,
    () => {
      throw new Error(`No values provided by iterable`);
    },
    comparator
  );
