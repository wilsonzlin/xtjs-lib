type Scalar = string | number | bigint | boolean | null | undefined;

export type UrlEncodedParams = {
  [name: string]: Scalar | Array<Scalar>;
};

export default (params: UrlEncodedParams) => {
  const pairs = Array<[string] | [string, string]>();
  const handleScalar = (n: string, v: Scalar) => {
    if (v == null) {
      return;
    }
    if (typeof v == "boolean") {
      if (!v) {
        return;
      }
      pairs.push([n]);
      return;
    }
    pairs.push([n, String(v)]);
  };
  for (const [n, v] of Object.entries(params)) {
    if (Array.isArray(v)) {
      v.forEach((v) => handleScalar(n, v));
    } else {
      handleScalar(n, v);
    }
  }
  return pairs.map((p) => p.map(encodeURIComponent).join("=")).join("&");
};
