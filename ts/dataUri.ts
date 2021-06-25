import encodeBase64 from "./encodeBase64";

export default (mime: string, data: Uint8Array | string) => {
  if (typeof data == "string") {
    return `data:${mime},${encodeURIComponent(data)}`;
  }
  return `data:${mime};base64,${encodeURIComponent(encodeBase64(data))}`;
};
