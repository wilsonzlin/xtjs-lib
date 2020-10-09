import Comparator from './Comparator';

export default <V> (value: V, minInclusive: boolean, min: V, max: V, maxInclusive: boolean, comparator: Comparator<V>) => {
  const cmpFrom = comparator(min, value);
  const cmpTo = comparator(max, value);
  return (minInclusive ? cmpFrom <= 0 : cmpFrom < 0) && (maxInclusive ? cmpTo >= 0 : cmpTo > 0);
}
