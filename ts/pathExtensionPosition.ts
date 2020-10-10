import { sep } from "path";
import mapNonNegative from "./mapNonNegative";

export default (path: string, separator: string = sep) => {
  const lastSepPos = path.lastIndexOf(separator) + 1;
  const dotPos = path.slice(lastSepPos).lastIndexOf(".");
  return mapNonNegative(dotPos, (dotPos) => lastSepPos + dotPos) ?? -1;
};
