import AssertionError from "./AssertionError";

export default (
  val: string,
  regex: RegExp,
  message: string = `String does not match regex ${regex}`
) => {
  if (!regex.test(val)) {
    throw new AssertionError(message);
  }
  return val;
};
