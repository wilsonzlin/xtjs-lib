export default (raw: string) => {
  raw = raw.trim();
  const headerMatch = /^-----BEGIN ([^-]+)-----[\r\n]/.exec(raw);
  if (!headerMatch) {
    throw new Error("PEM data does not have BEGIN line");
  }
  const tag = headerMatch[1];
  const footerMatch = /-----END ([^-]+)-----$/.exec(raw);
  if (!footerMatch || footerMatch[1] !== tag) {
    throw new Error("PEM data does not have matching END line");
  }
  const base64Data = raw
    .slice(headerMatch[0].length, footerMatch.index)
    .replace(/\s+/g, "");
  if (!/^[a-zA-Z0-9/+=]+$/.test(base64Data)) {
    throw new Error("PEM data has non-base64 characters");
  }
  return Buffer.from(base64Data, "base64");
};
