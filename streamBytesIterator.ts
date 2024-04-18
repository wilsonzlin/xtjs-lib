import isomorphicReadableStream, {
  IsomorphicReadableStream,
} from "./isomorphicReadableStream";

export default async function* (
  stream: IsomorphicReadableStream<ArrayBuffer | Uint8Array>
) {
  for await (const chunk of isomorphicReadableStream(stream)) {
    if (chunk instanceof Uint8Array) {
      yield* chunk;
    } else {
      yield* new Uint8Array(chunk);
    }
  }
}
