import maybeParseNumber from "./maybeParseNumber";

export default (raw: string): number => {
  const parsed = maybeParseNumber(raw);
  if (parsed === undefined) {
    throw new TypeError(`Invalid number`);
  }
  return parsed;
};
