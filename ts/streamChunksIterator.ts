import concatBuffers from "./concatBuffers";

export default async function* (
  input: AsyncIterable<Uint8Array>,
  size: number
) {
  const buf = Array<Uint8Array>();
  let bufSize = 0;
  for await (const chunk of input) {
    const chunkLen = chunk.byteLength;
    if (bufSize + chunkLen < size) {
      buf.push(chunk);
      bufSize += chunkLen;
      continue;
    }

    const rem = bufSize + chunkLen - size;
    // If `rem` is 0 then `.slice(x, -0)` will result in an EMPTY buffer because -0 === 0.
    buf.push(!rem ? chunk : chunk.slice(0, -rem));
    const data = concatBuffers(buf.splice(0), size);
    // If `rem` is 0 then `.slice(-0)` will result in the FULL buffer because -0 === 0 (i.e. not sliced at all).
    if (!rem) {
      bufSize = 0;
    } else {
      buf.push(chunk.slice(-rem));
      bufSize = rem;
    }
    yield data;
  }
  return concatBuffers(buf, bufSize);
}
