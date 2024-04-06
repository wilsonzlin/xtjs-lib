import { Readable } from "node:stream";
import assertInstanceOf from "./assertInstanceOf";

// This is safe from race conditions: if the stream is already readable, it will perform a read immediately, and will not wait for the readable event (which would never occur otherwise).
// WARNING: This will not listen for error or close events, so if they occur this function will stall forever. Therefore, make sure those are handled elsewhere.
export default async (stream: Readable, n: number) => {
  if (n === 0) {
    return Buffer.alloc(0);
  }
  const chunks = [];
  let readLen = 0;
  while (readLen < n) {
    // We must read only `readableLength` if that's all that's available, as otherwise we'll stall forever because `.read()` will return null but the `readable` event will never trigger.
    const rd = stream.read(Math.min(stream.readableLength, n - readLen));
    if (rd === null) {
      await new Promise((resolve) => stream.once("readable", resolve));
      continue;
    }
    const buf = assertInstanceOf(rd, Buffer);
    chunks.push(buf);
    readLen += buf.length;
  }
  return Buffer.concat(chunks, readLen);
};
