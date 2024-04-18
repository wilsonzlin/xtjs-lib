import mapNonNegative from "./mapNonNegative";

export default (str: string, substr: string) =>
  mapNonNegative(str.indexOf(substr), (pos) =>
    str.slice(pos + substr.length)
  ) ?? "";
