export default <R>(val: number, mapper: (val: number) => R) =>
  val < 0 ? mapper(val) : undefined;
