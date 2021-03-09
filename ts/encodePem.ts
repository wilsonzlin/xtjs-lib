import chunks from "./chunks";

export default (tag: string, raw: Buffer) =>
  [
    `-----BEGIN ${tag}-----`,
    ...chunks(raw.toString("base64"), 64),
    `-----END ${tag}-----`,
  ].join("\n");
