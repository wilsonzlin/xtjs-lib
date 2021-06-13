export default (
  str: string,
  split: string | RegExp,
  limit?: number
): string[] => {
  if (!str.length) {
    return [];
  }
  const parts = str.split(split, limit);
  const partsCombinedLen =
    parts.reduce((len, p) => len + p.length, 0) + parts.length - 1;
  parts[parts.length - 1] += str.slice(partsCombinedLen);
  return parts;
};
