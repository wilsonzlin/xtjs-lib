import Comparator from "./Comparator";
import nativeOrdering from "./nativeOrdering";

export default <O, D>(
  derivation: (val: O) => D,
  derivedComparator: Comparator<D> = nativeOrdering as any
): Comparator<O> => (a, b) => derivedComparator(derivation(a), derivation(b));
