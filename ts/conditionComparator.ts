import Comparator from "./Comparator";

/**
 * Create a comparator that orders values that pass a predicate before values that do not.
 * Values that fail the predicate are considered equal, while values that pass are compared using the {@param additional} comparator.
 * @param cond predicate to test values against.
 */
export default <V>(
    cond: (val: V) => boolean,
    additional: Comparator<V>
  ): Comparator<V> =>
  (a, b) => {
    const pA = cond(a);
    const pB = cond(b);
    if (pA && pB) {
      return additional(a, b);
    }
    return +pB - +pA;
  };
