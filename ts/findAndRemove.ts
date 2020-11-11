import mapNonNegative from "./mapNonNegative";

export default <V>(
  array: V[],
  pred: (val: V, i: number, a: V[]) => boolean
): V | undefined =>
  mapNonNegative(array.findIndex(pred), (index) => array.splice(index, 1)[0]);
