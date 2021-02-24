import AssertionError from "./AssertionError";
import isEmpty from "./isEmpty";

export default <C extends { length: number } | { size: number }>(
  collection: C,
  msg: string = "value is empty"
): C => {
  if (isEmpty(collection)) {
    throw new AssertionError(msg);
  }
  return collection;
};
