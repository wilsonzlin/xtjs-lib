export default (data: Uint8Array) =>
  Buffer.from(data.buffer, data.byteOffset, data.byteLength).toString("base64");
