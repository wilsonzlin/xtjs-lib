import UnreachableError from "./UnreachableError";

export default <C extends { length: number } | { size: number }>(
  collection: C
): boolean => {
  // Do not use 'in' operator on string, it will throw an error.
  if (typeof collection == "string") {
    return !collection;
  }
  if (typeof collection == "object" && collection) {
    return !("size" in collection ? collection["size"] : collection["length"]);
  }
  throw new UnreachableError();
};
