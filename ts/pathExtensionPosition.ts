import { sep } from "path";

export default (path: string, separator: string = sep) => {
  const lastSepPos = path.lastIndexOf(separator) + 1;
  return lastSepPos + path.slice(lastSepPos).lastIndexOf(".");
};
