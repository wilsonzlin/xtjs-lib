export default <V>(
  vals: {
    length: number;
    [index: number]: V;
  },
  pred: (val: V) => boolean,
  from = 0
) => {
  for (let i = from; i < vals.length; i++) {
    const v = vals[i];
    if (pred(v)) {
      return i;
    }
  }
  return -1;
};
