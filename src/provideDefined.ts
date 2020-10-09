export default <V>(val: V | undefined, def: () => V) =>
  val === undefined ? def() : val;
