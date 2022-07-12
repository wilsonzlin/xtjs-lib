import filterValue from "./filterValue";
import mapDefined from "./mapDefined";
import mapExists from "./mapExists";

export default (params: {
  [name: string]: string | number | bigint | boolean | null | undefined;
}) => {
  const pairs = Array<[string] | [string, string]>();
  for (const [n, v] of Object.entries(params)) {
    if (v == null) {
      continue;
    }
    if (typeof v == "boolean") {
      if (!v) {
        continue;
      }
      pairs.push([n]);
      continue;
    }
    pairs.push([n, String(v)]);
  }

  if (!pairs.length) {
    return "";
  }
  return "?" + pairs.map((p) => p.map(encodeURIComponent).join("=")).join("&");
};
