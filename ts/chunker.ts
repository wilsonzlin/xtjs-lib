import concatBuffers from "./concatBuffers";

// Takes in Uint8Array instances of various lengths and outputs Uint8Array instances of a fixed length.
export class Chunker {
  private readonly buf = Array<Uint8Array>();
  private bufSize = 0;

  constructor(readonly size: number) {}

  push(bytes: Uint8Array) {
    const byteCount = bytes.byteLength;
    if (this.bufSize + byteCount < this.size) {
      this.buf.push(bytes);
      this.bufSize += byteCount;
      return undefined;
    }

    const rem = this.bufSize + byteCount - this.size;
    // If `rem` is 0 then `.slice(x, -0)` will result in an EMPTY buffer because -0 === 0.
    this.buf.push(!rem ? bytes : bytes.slice(0, -rem));
    const data = concatBuffers(this.buf.splice(0), this.size);
    // If `rem` is 0 then `.slice(-0)` will result in the FULL buffer because -0 === 0 (i.e. not sliced at all).
    if (!rem) {
      this.bufSize = 0;
    } else {
      this.buf.push(bytes.slice(-rem));
      this.bufSize = rem;
    }
    return data;
  }

  takeRemaining() {
    const { bufSize } = this;
    const data = concatBuffers(this.buf.splice(0), bufSize);
    this.bufSize = 0;
    return data;
  }
}
