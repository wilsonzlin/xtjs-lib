import filterValue from "./filterValue";

export default (raw: string, base: number = 10): number | undefined => {
  // Use a regex test as it's stricter than Number.parseInt.
  if (!/^[0-9]+$/.test(raw)) {
    return undefined;
  }
  const parsed = Number.parseInt(raw, base);
  // Check again as it could be out of range.
  if (!Number.isSafeInteger(parsed)) {
    return undefined;
  }
  return parsed;
};
