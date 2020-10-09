import Comparator from './Comparator';

export default <T> (comparator: Comparator<T>) => (a: T, b: T) => comparator(a, b) * -1;
