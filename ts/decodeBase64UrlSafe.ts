import decodeBase64 from "./decodeBase64";

export default (enc: string) =>
  decodeBase64(enc.replaceAll("_", "+").replaceAll("-", "/"));
