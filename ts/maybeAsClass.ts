export default <T>(
  val: unknown,
  cls: {
    new (...args: any[]): T;
  }
): T => (val instanceof cls ? (val as any) : undefined);
