import Chunker from "./chunker";

export default async function* (
  input: AsyncIterable<Uint8Array>,
  size: number,
  // This is default false by assumption that most people will want to keep all data and not just silently throw away a chunk. Even if they require all exact-size chunks, they should still receive all chunks and make an assertion on each chunk.
  discardRemaining = false
) {
  const chunker = new Chunker(size);
  for await (const chunk of input) {
    yield* chunker.push(chunk);
  }
  const rem = chunker.takeRemaining();
  if (!discardRemaining && rem.byteLength) {
    yield rem;
  }
}
