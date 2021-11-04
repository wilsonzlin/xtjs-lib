import { expect } from "chai";
import { readFile } from "fs/promises";
import { PassThrough } from "stream";
import asyncTimeout from "./asyncTimeout";
import cryptoRandomHex from "./cryptoRandomHex";
import numberGenerator from "./numberGenerator";
import persistedPassThrough from "./persistedPassThrough";
import readBufferStream from "./readBufferStream";

const bytes = (...bytes: number[]) => Buffer.from(bytes);

describe("persistedPassThrough", () => {
  it("should pass correct data through", async () => {
    const END = 10;
    const up = new PassThrough();
    const path = `/tmp/extlib-persistedpassthrough-test-${cryptoRandomHex(16)}`;
    const pt = await persistedPassThrough({
      upstream: up,
      persistencePath: path,
    });
    const downs = Promise.all(
      (
        [
          [0],
          [100, 7],
          [200, 5, 10],
          [200, 0, 20],
          [500, 1, 8],
          [400, undefined, undefined],
          [300, 3],
          [150, 6],
          [900, 10],
          [1100, 11],
        ] as const
      ).map(async ([delay, start, end]) => {
        await asyncTimeout(delay);
        const d = pt.downstream(start, end);
        expect([...(await readBufferStream(d))]).to.deep.equal([
          ...numberGenerator(start ?? 0, Math.min(end ?? Infinity, END) + 1),
        ]);
      })
    );
    up.write(bytes(0));
    await asyncTimeout(100);
    up.write(bytes(1, 2));
    await asyncTimeout(200);
    up.write(bytes(3));
    await asyncTimeout(100);
    up.write(bytes(4, 5, 6));
    await asyncTimeout(300);
    up.write(bytes(7));
    await asyncTimeout(100);
    up.write(bytes(8, 9));
    await asyncTimeout(200);
    up.write(bytes(10));
    up.end();
    await downs;
    expect([...(await readFile(path))]).to.deep.equal([
      ...numberGenerator(0, END + 1),
    ]);
  }).timeout(60000);
});
