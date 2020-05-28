export const nullParseInt = (raw: string, base: number = 10): number | null => {
  const parsed = Number.parseInt(raw, base);
  return !Number.isSafeInteger(parsed) ? null : parsed;
};

export const nullParseNumber = (raw: string): number | null => {
  const parsed = Number.parseFloat(raw);
  return !Number.isFinite(parsed) ? null : parsed;
};
