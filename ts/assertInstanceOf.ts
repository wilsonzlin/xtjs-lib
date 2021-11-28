import AssertionError from "./AssertionError";
import describeType from "./describeType";

export default <V>(
  val: unknown,
  type: new (...args: any[]) => V,
  msg: string = `Unexpected type of instance (expected ${
    type.name
  }, got ${describeType(val)})`
): V => {
  if (!(val instanceof type)) {
    throw new AssertionError(msg);
  }
  return val;
};
