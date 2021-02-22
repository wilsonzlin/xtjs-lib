import AssertionError from "./AssertionError";

export default <C extends { length: number } | { size: number }>(
  collection: C,
  msg: string = "value is empty"
): C => {
  const c = collection as any;
  const empty = ("size" in c ? c.size : c.length) === 0;
  if (empty) {
    throw new AssertionError(msg);
  }
  return collection;
};
