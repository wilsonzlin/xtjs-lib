import arrayFromAsyncIterable from "./arrayFromAsyncIterable";
import isomorphicReadableStream, {
  IsomorphicReadableStream,
} from "./isomorphicReadableStream";

export default async (stream: IsomorphicReadableStream<string>) =>
  (await arrayFromAsyncIterable(isomorphicReadableStream(stream))).join("");
