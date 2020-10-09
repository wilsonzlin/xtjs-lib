export default <T extends {}>(
  obj: T,
  filter: (val: T[keyof T], key: string) => boolean
) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => filter(value as any, key))
  );
