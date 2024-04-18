import AssertionError from "./AssertionError";

export default <V extends ArrayLike<unknown>>(
  ary: V,
  len: number,
  msg: string = `Array has ${ary.length} element(s) but expected ${len}`
): V => {
  if (len !== ary.length) {
    throw new AssertionError(msg);
  }
  return ary;
};
