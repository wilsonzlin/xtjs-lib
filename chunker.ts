import assertExists from "./assertExists";
import assertState from "./assertState";
import concatBuffers from "./concatBuffers";

// Takes in Uint8Array instances of various lengths and outputs Uint8Array instances of a fixed length.
export default class Chunker {
  private readonly buf = Array<Uint8Array>();
  private bufSize = 0;

  constructor(readonly size: number) {}

  *push(
    bytes: Uint8Array,
    chunkSizeOverride = this.size
  ): Generator<Uint8Array, void, unknown> {
    const byteCount = bytes.byteLength;
    this.buf.push(bytes);
    this.bufSize += byteCount;

    const parts = [];
    let partLen = 0;
    while (this.bufSize >= chunkSizeOverride - partLen) {
      const part = assertExists(this.buf[0]);
      // How many bytes would be remaining if we added the first Uint8Array in the buffer.
      const rem = partLen + part.byteLength - chunkSizeOverride;
      if (rem <= 0) {
        // If rem < 0: adding this Uint8Array would still not be enough, so add this part and continue the loop.
        // If rem == 0: adding this Uint8Array would be exactly enough for a single chunk.
        parts.push(part);
        partLen += part.byteLength;
        this.buf.shift();
        this.bufSize -= part.byteLength;
        if (rem == 0) {
          yield concatBuffers(parts.splice(0), partLen);
          partLen = 0;
        }
      } else {
        const partPart = part.slice(0, -rem);
        parts.push(partPart);
        yield concatBuffers(parts.splice(0), chunkSizeOverride);
        this.bufSize -= partPart.byteLength;
        this.buf[0] = part.slice(-rem);
        partLen = 0;
      }
    }
    assertState(!parts.length);
    assertState(partLen === 0);
    return;
  }

  takeRemaining() {
    const { bufSize } = this;
    const data = concatBuffers(this.buf.splice(0), bufSize);
    this.bufSize = 0;
    return data;
  }
}
