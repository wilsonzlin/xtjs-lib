import { createReadStream } from "fs";
import { open } from "fs/promises";
import { PassThrough, Readable, Writable } from "stream";
import assertState from "./assertState";
import rangeIntersection from "./rangeIntersection";

export default async ({
  upstream,
  persistencePath,
  onPersisted,
  onChunkWriteError,
}: {
  upstream: Readable;
  persistencePath: string;
  onPersisted?: (stats: { size: number }) => void;
  onChunkWriteError?: (err: Error) => Promise<boolean>;
}) => {
  const downstreams: {
    stream: Writable;
    // Offset of the next byte yet to be received.
    next: number;
    // Inclusive.
    end: number;
    initialised: Promise<any>;
  }[] = [];
  // Offset of the next byte yet to be received.
  // This means we don't have byte at `next`, or any byte after it.
  let next = 0;
  let ended = false;

  // Use file handle instead of writable stream to ensure writes are flushed each time.
  const persistence = await open(persistencePath, "w");
  (async () => {
    // Use async for loop to ensure chunks are processed one-by-one in order.
    for await (const chunk of upstream) {
      if (!Buffer.isBuffer(chunk)) {
        throw new TypeError(`Received non-Buffer data`);
      }
      const chunkStart = next;
      const chunkEnd = chunkStart + chunk.byteLength - 1;
      while (true) {
        try {
          // Provide offset in case previous errors changed fh position.
          await persistence.write(chunk, 0, chunk.byteLength, chunkStart);
          break;
        } catch (e) {
          if (!(await onChunkWriteError?.(e))) {
            throw e;
          }
        }
      }
      // `next` must be updated AFTER writing has been flushed to avoid race condition where a downstream is initialised based on a larger value of `next` but bytes haven't actually been written yet.
      next += chunk.byteLength;
      for (const d of downstreams) {
        if (d.next <= d.end) {
          // Downstream still has pending bytes.
          const range = rangeIntersection(
            [chunkStart, chunkEnd],
            [d.next, d.end]
          );
          if (range) {
            d.initialised.then(() =>
              d.stream.write(
                chunk.slice(range[0] - chunkStart, range[1] - chunkStart + 1)
              )
            );
            d.next = range[1] + 1;
          }
        } else {
          d.initialised.then(() => d.stream.end());
        }
      }
    }
    ended = true;
    onPersisted?.({ size: next });
    for (const d of downstreams) {
      d.initialised.then(() => d.stream.end());
    }
  })().finally(() => persistence.close());

  return {
    downstream(start = 0, end = Infinity) {
      if (ended) {
        return createReadStream(persistencePath, { start, end });
      }
      // Cache `next` value.
      // We don't need to cache `writing` as code is synchronous up to usage of it.
      const persistedLen = next;
      assertState(start <= end);
      const stream = new PassThrough();
      const downstreamNext = Math.max(start, persistedLen);
      downstreams.push({
        stream,
        end,
        next: downstreamNext,
        // We need to add this downstream immediately to `downstreams` as `next` could change if we await an asynchronous read from the file system.
        initialised: (async () => {
          if (start >= persistedLen) {
            return;
          }
          const fh = await open(persistencePath, "r");
          try {
            const length = Math.min(end + 1, persistedLen) - start;
            assertState(length > 0);
            const buffer = Buffer.alloc(length);
            const { bytesRead } = await fh.read({
              buffer,
              position: start,
              length,
            });
            assertState(
              bytesRead === length,
              `Expected to read ${length} bytes from persisted file, but got ${bytesRead}`
            );
            stream.write(buffer);
          } finally {
            await fh.close();
          }
        })().catch((err) =>
          stream.destroy(
            new Error(
              `Encountered ${err.name} while initialising downstream: ${err.message}`
            )
          )
        ),
      });
      return stream;
    },
  };
};
