import AssertionError from "./AssertionError";

export default <V>(
  val: unknown,
  verifier: (val: unknown) => val is V,
  msg: string = "Value is not of the correct type"
): V => {
  if (!verifier(val)) {
    throw new AssertionError(msg);
  }
  return val;
};
