import AssertionError from "./AssertionError";

export default <V>(arr: V[], msg: string = "More than one"): [] | [V] => {
  if (arr.length > 1) {
    throw new AssertionError(msg);
  }
  return arr as any;
};
