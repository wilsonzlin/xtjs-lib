import UnreachableError from "./UnreachableError";

export default <T, R>(
  val: T,
  ...arms: [
    ...[(val: T) => any, (val: T) => R][],
    [true | ((val: T) => any), (val: T) => R]
  ]
) => {
  for (const [pred, map] of arms) {
    if (pred === true || pred(val)) {
      return map(val);
    }
  }
  throw new UnreachableError();
};
