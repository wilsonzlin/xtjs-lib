import mapNonNegative from "./mapNonNegative";

export default <V>(
  array: V[],
  pred: (val: V, i: number, a: V[]) => boolean,
  replacer: (val: V, i: number, a: V[]) => V
): V | undefined =>
  mapNonNegative(
    array.findIndex(pred),
    (index) => array.splice(index, 1, replacer(array[index], index, array))[0]
  );
