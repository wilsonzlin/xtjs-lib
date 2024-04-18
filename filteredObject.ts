export default <T extends {}>(
  obj: T,
  filter: <K extends keyof T>(val: T[K], key: K) => boolean
) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key, value]) =>
      filter(value as any, key as any)
    )
  );
