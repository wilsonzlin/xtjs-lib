import Comparator from './Comparator';

export default <T> (...comparators: Comparator<T>[]): Comparator<T> =>
  (a, b) => comparators.reduce((result, comparator) => result || comparator(a, b), 0);
