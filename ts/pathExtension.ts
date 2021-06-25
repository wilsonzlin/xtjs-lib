import mapNonNegative from "./mapNonNegative";
import pathExtensionPosition from "./pathExtensionPosition";

/**
 * Return the extension (excluding dot) of a file path.
 * If the file path has no extension, return undefined.
 */
export default (path: string, sep?: string) =>
  mapNonNegative(pathExtensionPosition(path, sep), (pos) => path.slice(pos));
