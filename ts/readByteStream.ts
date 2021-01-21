import arrayFromAsyncIterable from "./arrayFromAsyncIterable";
import concatBuffers from "./concatBuffers";
import isomorphicReadableStream, {
  IsomorphicReadableStream,
} from "./isomorphicReadableStream";

export default async <C extends Buffer | Uint8Array | ArrayBufferLike>(
  stream: IsomorphicReadableStream<C>
) =>
  concatBuffers(
    ...(await arrayFromAsyncIterable(isomorphicReadableStream(stream)))
  );
