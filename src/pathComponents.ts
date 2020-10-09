import { sep } from "path";

export default (path: string, separator: string | RegExp = sep) =>
  path.split(separator).filter((c) => c);
