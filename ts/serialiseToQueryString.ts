import filterValue from "./filterValue";
import mapDefined from "./mapDefined";
import mapExists from "./mapExists";

export default (params: {
  [name: string]: string | number | null | undefined;
}) =>
  mapDefined(
    filterValue(
      Object.entries(params)
        .map(([n, v]) => [n, mapExists(v, String)] as const)
        .filter((p): p is [string, string] => p[1] != undefined),
      (p) => p.length > 0
    ),
    (p) =>
      "?" + p.map((pair) => pair.map(encodeURIComponent).join("=")).join("&")
  ) ?? "";
