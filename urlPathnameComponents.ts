import decodeUrlEncoded from "./decodeUrlEncoded";

export default (raw: string) =>
  raw
    .split("/")
    .filter((c) => c)
    .map((c) => decodeUrlEncoded(c));
