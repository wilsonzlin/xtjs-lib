import { sep } from "path";
import mapNonNegative from "./mapNonNegative";

/**
 * Return the index of the dot representing the extension of the provided
 * file path. If no extension exists, return -1.
 */
export default (path: string, separator: string = sep) => {
  const lastSepPos = path.lastIndexOf(separator) + 1;
  const dotPos = path.slice(lastSepPos).lastIndexOf(".");
  return mapNonNegative(dotPos, (dotPos) => lastSepPos + dotPos) ?? -1;
};
