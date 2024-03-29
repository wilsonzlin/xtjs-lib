import encodeBase64 from "./encodeBase64";
import slices from "./slices";

export default (tag: string, raw: Uint8Array) =>
  [
    `-----BEGIN ${tag}-----`,
    ...slices(encodeBase64(raw), 64),
    `-----END ${tag}-----`,
  ].join("\n");
