import { expect } from "chai";
import { PassThrough } from "stream";
import asyncTimeout from "./asyncTimeout";
import readBufferStream from "./readBufferStream";

describe("readBufferStream", () => {
  it("should wait until stream ends and contain all data up to end", async () => {
    const stream = new PassThrough();
    const outPromise = readBufferStream(stream);
    stream.write(Buffer.from([0, 1, 2]));
    await asyncTimeout(1000);
    stream.write(Buffer.from([3, 4]));
    await asyncTimeout(500);
    stream.write(Buffer.from([]));
    await asyncTimeout(250);
    stream.write(Buffer.from([5]));
    await asyncTimeout(100);
    stream.write(Buffer.from([6, 7]));
    await asyncTimeout(10);
    stream.write(Buffer.from([8]));
    await asyncTimeout(20);
    stream.end(Buffer.from([9]));
    expect([...(await outPromise)]).to.deep.equal([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
  }).timeout(10000);

  it("should concat all chunks fully and in order", async () => {
    const stream = new PassThrough();
    const outPromise = readBufferStream(stream);
    stream.write(Buffer.from([0, 1, 2, 3, 4, 5]));
    stream.write(Buffer.from([6, 7, 8]));
    stream.write(Buffer.from([]));
    stream.write(Buffer.from([9, 10, 11, 12]));
    stream.write(new Uint8Array([13, 14]));
    stream.write("\x0f");
    stream.end();
    expect([...(await outPromise)]).to.deep.equal([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
  });
});
