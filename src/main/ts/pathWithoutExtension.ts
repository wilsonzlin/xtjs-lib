import pathExtensionPosition from "./pathExtensionPosition";
import mapNonNegative from "./mapNonNegative";

export default (path: string) =>
  mapNonNegative(pathExtensionPosition(path), (pos) => path.slice(0, pos)) ??
  path;
