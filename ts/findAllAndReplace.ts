export default <V>(
  array: V[],
  pred: (val: V, i: number, a: V[]) => boolean,
  replacer: (val: V, i: number, a: V[]) => V
): V[] => {
  // Don't replace until after iteration.
  const replacements = [];
  const values = [];
  for (let i = 0; i < array.length; i++) {
    if (pred(array[i], i, array)) {
      values.push(array[i]);
      replacements.push([i, replacer(array[i], i, array)] as const);
    }
  }
  for (const [i, v] of replacements) {
    array[i] = v;
  }
  return values;
};
