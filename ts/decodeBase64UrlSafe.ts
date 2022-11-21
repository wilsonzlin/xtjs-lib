import decodeBase64 from "./decodeBase64";

// https://www.rfc-editor.org/rfc/rfc4648#section-5
export default (enc: string) =>
  decodeBase64(enc.replaceAll("-", "+").replaceAll("_", "/"));
