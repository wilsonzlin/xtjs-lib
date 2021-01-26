import arrayFromAsyncIterable from "./arrayFromAsyncIterable";
import concatBuffers from "./concatBuffers";
import isomorphicReadableStream, {
  IsomorphicReadableStream,
} from "./isomorphicReadableStream";

export default async (
  // Node.js Buffer values are also JavaScript Uint8Array and TypedArray instances;
  // see https://nodejs.org/api/buffer.html#buffer_buffers_and_typedarrays.
  stream: IsomorphicReadableStream<Uint8Array | ArrayBufferLike>
) =>
  concatBuffers(
    ...(await arrayFromAsyncIterable(isomorphicReadableStream(stream)))
  );
