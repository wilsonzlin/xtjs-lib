import AssertionError from "./AssertionError";

export default (val: unknown, msg = "Not a byte number"): number => {
  if (
    typeof val != "number" ||
    !Number.isSafeInteger(val) ||
    val < 0 ||
    val > 255
  ) {
    throw new AssertionError(msg);
  }
  return val;
};
