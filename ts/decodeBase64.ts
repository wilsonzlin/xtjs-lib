const decodeBase64 =
  typeof Buffer == "function"
    ? (enc: string) => Buffer.from(enc, "base64")
    : (enc: string) => Uint8Array.from(atob(enc), (c) => c.charCodeAt(0));
