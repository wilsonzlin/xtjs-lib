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

export default (...buffers: (TypedArray | ArrayBufferLike | number[])[]) => {
  const size = buffers.reduce(
    (sum, buf) => sum + (Array.isArray(buf) ? buf.length : buf.byteLength),
    0
  );
  const result = new Uint8Array(size);

  let offset = 0;
  for (const buf of buffers) {
    result.set(
      new Uint8Array(ArrayBuffer.isView(buf) ? buf.buffer : buf),
      offset
    );
    offset += Array.isArray(buf) ? buf.length : buf.byteLength;
  }
  return result.buffer;
};
