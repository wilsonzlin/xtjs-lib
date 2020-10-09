export default interface Comparator<T> {
  (a: T, b: T): number;
}
