const fn: (buffers: Uint8Array[], totalLength?: number) => Uint8Array =
  typeof Buffer == "function"
    ? Buffer.concat
    : (
        buffers,
        totalLength = buffers.reduce((sum, buf) => sum + buf.byteLength, 0)
      ) => {
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const buf of buffers) {
          result.set(buf, offset);
          offset += buf.byteLength;
        }
        return result;
      };

export default fn;
