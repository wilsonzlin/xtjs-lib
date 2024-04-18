import { Duplex } from "node:stream";

const assertIsBytes = (chunk: unknown, encoding: unknown) => {
  if (encoding !== "buffer" || !Buffer.isBuffer(chunk)) {
    throw new TypeError(`Expected bytes`);
  }
};

export default class Lines extends Duplex {
  private buffer = Buffer.alloc(0);
  private canPush = false;

  constructor(
    private readonly mapper = (line: string): string | undefined => line,
    private readonly includeFinalUnterminated = false
  ) {
    super({});
  }

  private pushLine(upToPos: number) {
    // Include the LF in the value.
    const line = this.mapper(this.buffer.slice(0, upToPos).toString("utf-8"));
    this.buffer = this.buffer.slice(upToPos);
    if (line != undefined) {
      this.canPush = this.push(line);
    }
  }

  private maybeRead() {
    while (this.canPush) {
      const pos = this.buffer.indexOf(10);
      if (pos == -1) {
        break;
      }
      this.pushLine(pos + 1);
    }
  }

  override _read() {
    this.canPush = true;
    this.maybeRead();
  }

  override _write(
    chunk: any,
    encoding: any,
    callback: (error?: Error | null | undefined) => void
  ): void {
    assertIsBytes(chunk, encoding);
    this.buffer = Buffer.concat([this.buffer, chunk]);
    callback();
    this.maybeRead();
  }

  override _writev(
    chunks: { chunk: any; encoding: BufferEncoding }[],
    callback: (error?: Error | null | undefined) => void
  ): void {
    chunks.forEach((c) => assertIsBytes(c.chunk, c.encoding));
    this.buffer = Buffer.concat([this.buffer, ...chunks.map((c) => c.chunk)]);
    callback();
    this.maybeRead();
  }

  override _final(callback: (error?: Error | null | undefined) => void): void {
    if (this.includeFinalUnterminated && this.buffer.length) {
      this.pushLine(this.buffer.length);
    }
    callback();
  }
}
