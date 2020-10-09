// Nulls are less than all values of T.
import Comparator from './Comparator';

export default <T> (comparator: Comparator<T>): Comparator<T | null> => {
  return (a, b) => {
    if (a === null && b === null) {
      return 0;
    }
    if (a === null) {
      return -1;
    }
    if (b === null) {
      return 1;
    }
    return comparator(a, b);
  };
};
