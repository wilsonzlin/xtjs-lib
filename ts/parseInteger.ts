export default (raw: string, base = 10): number => {
  // Use a regex test as it's stricter than Number.parseInt.
  if (!/^[0-9]+$/.test(raw)) {
    throw new TypeError(`Invalid integer`);
  }
  const parsed = Number.parseInt(raw, base);
  return parsed;
};
