import findAndRemove from "./findAndRemove";

// Always returns a new array.
export default <T>(ary: ReadonlyArray<T>, val: T, toggle: boolean): T[] => {
  const res = ary.slice();
  findAndRemove(res, (e) => e === val);
  if (toggle) {
    res.push(val);
  }
  return res;
};
