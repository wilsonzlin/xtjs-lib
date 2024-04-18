/**
 * Like the built in String.prototype.split function, with slight differences:
 * - If the string is empty, an empty array is returned.
 * - If a limit is provided, the last returned element will contain any
 *   leftover characters. For example, `splitString("a.b.c.d.e", ".", 3)` will
 *   return `["a", "b", "c.d.e"]`.
 */
export default (
  str: string,
  split: string | RegExp,
  limit?: number
): string[] => {
  if (!str.length || (limit != undefined && limit <= 0)) {
    return [];
  }
  if (typeof split == "string") {
    const parts = str.split(split, limit);
    const partsCombinedLen =
      parts.reduce((len, p) => len + p.length, 0) +
      (parts.length - 1) * split.length;
    parts[parts.length - 1] += str.slice(partsCombinedLen);
    return parts;
  }
  if (split.global || split.sticky) {
    throw new TypeError(
      "Do not provide a RegExp with the global or sticky flags set to splitString"
    );
  }
  const parts = [];
  let m;
  while (
    (limit == undefined || parts.length < limit - 1) &&
    (m = split.exec(str))
  ) {
    parts.push(str.slice(0, m.index));
    str = str.slice(m.index + m[0].length);
  }
  parts.push(str);
  return parts;
};
