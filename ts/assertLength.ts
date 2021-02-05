import AssertionError from "./AssertionError";

export default <V extends ArrayLike<unknown>>(
  ary: V,
  len: number,
  msg?: string
): V => {
  if (len !== ary.length) {
    throw new AssertionError(
      msg ?? `Array has ${ary.length} element(s) but expected ${len}`
    );
  }
  return ary;
};
