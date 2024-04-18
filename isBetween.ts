import Comparator from "./Comparator";
import nativeOrdering from "./nativeOrdering";

export default <V>(
  value: V,
  min: V,
  max: V,
  comparator: Comparator<V> = nativeOrdering as any
) => comparator(min, value) <= 0 && comparator(max, value) >= 0;
