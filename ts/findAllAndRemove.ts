export default <V>(
  array: V[],
  pred: (val: V, i: number, a: V[]) => boolean
): V[] => {
  const indicesToDelete = [];
  const values = [];
  for (let i = 0; i < array.length; i++) {
    if (pred(array[i], i, array)) {
      indicesToDelete.push(i);
      values.push(array[i]);
    }
  }
  for (let i = indicesToDelete.length - 1; i >= 0; i--) {
    array.splice(indicesToDelete[i], 1);
  }
  return values;
};
