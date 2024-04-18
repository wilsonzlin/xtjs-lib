import maybeParseInteger from "./maybeParseInteger";

export default (raw: string, base = 10): number => {
  const parsed = maybeParseInteger(raw, base);
  if (parsed === undefined) {
    throw new TypeError(`Invalid integer`);
  }
  return parsed;
};
