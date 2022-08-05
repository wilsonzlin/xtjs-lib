export type UrlEncodedParams = {
  [name: string]: string | number | bigint | boolean | null | undefined;
};

export default (params: UrlEncodedParams) => {
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
  return pairs.map((p) => p.map(encodeURIComponent).join("=")).join("&");
};
