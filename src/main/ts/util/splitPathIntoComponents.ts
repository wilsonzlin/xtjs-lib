import * as Path from "path";

export function splitPathIntoComponents(path: string): string[] {
  return path.replace(/^[\\\/]|[\\\/]$/g, "").split(Path.sep);
}
