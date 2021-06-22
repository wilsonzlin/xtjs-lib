export default async <R>(
  upToMs: number,
  toGet: () => Promise<R | undefined>
): Promise<R | undefined> => {
  const endAfter = Date.now() + upToMs;
  while (Date.now() <= endAfter) {
    const res = await toGet();
    if (res !== undefined) {
      return res;
    }
  }
  return undefined;
};
