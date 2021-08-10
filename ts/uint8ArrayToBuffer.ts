export default (u8arr: Uint8Array) =>
  Buffer.from(u8arr.buffer, u8arr.byteOffset, u8arr.byteLength);
