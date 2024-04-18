import mapExists from "./mapExists";

export default <R>(
  raw: string,
  regex: RegExp,
  mapper: (...matches: string[]) => R
): R | undefined =>
  mapExists(regex.exec(raw), (matches) => mapper(...matches.slice(1)));
