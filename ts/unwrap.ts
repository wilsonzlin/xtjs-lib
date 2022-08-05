import assertState from "./assertState";

export default <T>(
  arr: T[],
  msg = `Expected array of exactly one element (got ${arr.length})`
): T => {
  assertState(arr.length == 1, msg);
  return arr[0];
};
