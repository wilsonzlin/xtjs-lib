// TS does not automatically infer method overrides/implements.
// This function helps with that.
// https://github.com/microsoft/TypeScript/issues/23911.
export default <
  O extends {},
  C extends (this: O, ...args: unknown[]) => O,
  S extends {}
>(
  name: string,
  base: new (...args: unknown[]) => O,
  overrides: O & { constructor: C },
  staticOverrides: S
): C & S => {
  const { constructor, ...prototype } = overrides;
  const child = function (this: any) {
    return constructor.apply(this, arguments as any);
  };
  Object.assign(child, staticOverrides);
  Object.defineProperty(child, "name", { value: name });
  child.prototype = Object.assign(Object.create(base.prototype), prototype);
  return child as any;
};
