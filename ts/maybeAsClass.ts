export default <T>(
  val: unknown,
  cls: {
    new (...args: unknown[]): T;
  }
): T => (val instanceof cls ? (val as any) : undefined);
