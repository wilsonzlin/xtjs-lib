export default (buf: Buffer) =>
  new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
