import isomorphicReadableStream, {
  IsomorphicReadableStream,
} from "./isomorphicReadableStream";

export default async function* (
  stream: IsomorphicReadableStream<Buffer | ArrayBuffer | Uint8Array>
) {
  for await (const chunk of isomorphicReadableStream(stream)) {
    if (Buffer.isBuffer(chunk) || chunk instanceof Uint8Array) {
      yield* chunk;
    } else {
      yield* new Uint8Array(chunk);
    }
  }
}
