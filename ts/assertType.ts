import AssertionError from "./AssertionError";

export default <V>(
  val: unknown,
  verifier: (val: unknown) => val is V,
  msg?: string
): V => {
  if (!verifier(val)) {
    throw new AssertionError(msg ?? "Value is not of the correct type");
  }
  return val;
};
