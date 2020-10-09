import stringArrayEquals from "./stringArrayEquals";

export default (a: object, b: object) =>
  stringArrayEquals(Object.keys(a), Object.keys(b));
