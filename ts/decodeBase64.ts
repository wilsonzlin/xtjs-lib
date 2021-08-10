import bufferToUint8Array from "./bufferToUint8Array";

const decodeBase64 =
  typeof Buffer == "function"
    ? (enc: string) => bufferToUint8Array(Buffer.from(enc, "base64"))
    : (enc: string) => Uint8Array.from(atob(enc), (c) => c.charCodeAt(0));

export default decodeBase64;
