import * as Path from "path";

export const splitPathIntoComponents = (path: string): string[] => {
  return path.replace(/^[\\\/]|[\\\/]$/g, "").split(Path.sep);
};
