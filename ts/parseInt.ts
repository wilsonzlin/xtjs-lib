export default (raw: string, base: number = 10): number => {
  const parsed = Number.parseInt(raw, base);
  if (!Number.isSafeInteger(parsed)) {
    throw new TypeError(`Invalid integer`);
  }
  return parsed;
};
