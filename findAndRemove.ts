import mapNonNegative from "./mapNonNegative";

export default function <V, S extends V>(
  array: V[],
  pred: (val: V, i: number, a: V[]) => val is S
): S | undefined;
export default function <V>(
  array: V[],
  pred: (val: V, i: number, a: V[]) => boolean
): V | undefined;
export default function <V>(
  array: V[],
  pred: (val: V, i: number, a: V[]) => boolean
): V | undefined {
  return mapNonNegative(
    array.findIndex(pred),
    (index) => array.splice(index, 1)[0]
  );
}
