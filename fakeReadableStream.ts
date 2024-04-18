import { PassThrough } from "stream";
import asyncTimeout from "./asyncTimeout";
import randomInteger from "./randomInteger";

export const fakeReadableStream = (data: Uint8Array, maxWaitTimeMs: number) => {
  const src = new PassThrough();
  (async () => {
    let next = 0;
    while (src.writable && next < data.length) {
      const toWrite = randomInteger(0, data.length - next);
      src.write(data.slice(next, next + toWrite));
      next += toWrite;
      await asyncTimeout(randomInteger(0, maxWaitTimeMs));
    }
    // If next < data.length, the stream failed before we could write all bytes.
    if (next == data.length) {
      src.end();
    }
  })();
  return src;
};
