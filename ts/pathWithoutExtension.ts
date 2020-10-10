import mapNonNegative from "./mapNonNegative";
import pathExtensionPosition from "./pathExtensionPosition";

export default (path: string, sep?: string) =>
  mapNonNegative(pathExtensionPosition(path, sep), (pos) =>
    path.slice(0, pos)
  ) ?? path;
