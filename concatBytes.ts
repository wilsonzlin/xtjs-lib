// Node.js Buffer values are also JavaScript Uint8Array and TypedArray instances;
// see https://nodejs.org/api/buffer.html#buffer_buffers_and_typedarrays.
export default (
  // Other TypedArray types are intentionally unsupported as it might not be so clear that their underlying u8 buffer bytes, and not their number values, are used.
  buffers: (Uint8Array | ArrayBufferLike | ArrayLike<number>)[],
  totalLength = buffers.reduce(
    (sum, buf) => sum + ("byteLength" in buf ? buf.byteLength : buf.length),
    0
  )
): Uint8Array => {
  const result = new Uint8Array(totalLength);

  let offset = 0;
  for (const buf of buffers) {
    const u8Buf = ArrayBuffer.isView(buf)
      ? new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)
      : new Uint8Array(buf);
    result.set(u8Buf, offset);
    offset += u8Buf.byteLength;
  }
  return result;
};
