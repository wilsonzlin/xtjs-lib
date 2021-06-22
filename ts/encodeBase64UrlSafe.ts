import encodeBase64 from "./encodeBase64";

export default (data: Uint8Array) =>
  encodeBase64(data)
    .replaceAll("+", "_")
    .replaceAll("/", "-")
    .replaceAll("=", "");
