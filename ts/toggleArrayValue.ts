// Always returns a new array.
export default <T>(ary: ReadonlyArray<T>, val: T, toggle?: boolean): T[] => {
  const res = ary.filter((e) => e !== val);
  if ((toggle !== undefined && toggle) || (toggle === undefined && res.length === ary.length)) {
    res.push(val);
  }
  return res;
};
