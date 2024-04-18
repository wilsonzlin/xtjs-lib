// Due to https://github.com/microsoft/TypeScript/issues/42021, we can't use spread/rest operator to omit properties and still have it be valid JsobValue. This is also a bit faster.
export default <T extends {}, Props extends keyof T>(
  obj: T,
  ...props: Props[]
): Omit<T, Props> => {
  for (const prop of props) {
    delete obj[prop];
  }
  return obj;
};
