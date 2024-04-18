import encodeBase64 from "./encodeBase64";

// https://www.rfc-editor.org/rfc/rfc4648#section-5
export default (data: Uint8Array) =>
  encodeBase64(data)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
