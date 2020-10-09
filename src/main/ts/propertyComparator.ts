import Comparator from "./Comparator";

export default <O, P extends keyof O>(
  prop: P,
  propComparator: Comparator<O[P]>
): Comparator<O> => (a, b) => propComparator(a[prop], b[prop]);
