export default <T, R>(val: T | null | undefined, mapper: (val: T) => R) =>
  val == null ? undefined : mapper(val);
