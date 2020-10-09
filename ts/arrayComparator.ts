import Comparator from "./Comparator";
import nativeOrdering from "./nativeOrdering";

export default <T>(elemComparator: Comparator<T>): Comparator<T[]> => {
  return (a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const elemCmp = elemComparator(a[i], b[i]);
      if (elemCmp) {
        return elemCmp;
      }
    }
    return nativeOrdering(a.length, b.length);
  };
};
