import Comparator from "./Comparator";
import nativeOrdering from "./nativeOrdering";

export default <O, P extends keyof O>(
    prop: P,
    propComparator: Comparator<O[P]> = nativeOrdering as any
  ): Comparator<O> =>
  (a, b) =>
    propComparator(a[prop], b[prop]);
