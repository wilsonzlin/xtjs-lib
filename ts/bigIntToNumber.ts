import maybeBigIntToNumber from "./maybeBigIntToNumber";

export default (val: bigint) => {
  const res = maybeBigIntToNumber(val);
  if (res === undefined) {
    throw new RangeError("BigInt value cannot be safely converted to a Number");
  }
  return res;
};
