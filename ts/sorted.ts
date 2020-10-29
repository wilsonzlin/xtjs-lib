import Comparator from "./Comparator";

export default <T>(elems: Iterable<T>, comparator?: Comparator<T>): T[] =>
  [...elems].sort(comparator);
