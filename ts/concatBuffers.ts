type TypedArray =
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

// Node.js Buffer values are also JavaScript Uint8Array and TypedArray instances;
// see https://nodejs.org/api/buffer.html#buffer_buffers_and_typedarrays.
export default (
  ...buffers: (TypedArray | ArrayBufferLike | number[])[]
): Uint8Array => {
  const size = buffers.reduce(
    (sum, buf) => sum + (Array.isArray(buf) ? buf.length : buf.byteLength),
    0
  );
  const result = new Uint8Array(size);

  let offset = 0;
  for (const buf of buffers) {
    result.set(
      ArrayBuffer.isView(buf)
        ? new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)
        : new Uint8Array(buf),
      offset
    );
    offset += Array.isArray(buf) ? buf.length : buf.byteLength;
  }
  return result;
};
