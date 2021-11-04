import arrayFromAsyncIterable from "./arrayFromAsyncIterable";
import concatBuffers from "./concatBuffers";
import isomorphicReadableStream, {
  IsomorphicReadableStream,
} from "./isomorphicReadableStream";

export default async (
  stream: IsomorphicReadableStream<Uint8Array>
) =>
  concatBuffers(await arrayFromAsyncIterable(isomorphicReadableStream(stream)));
