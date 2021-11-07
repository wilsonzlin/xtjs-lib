import Chunker from "./chunker";

export default async function* (
  input: AsyncIterable<Uint8Array>,
  size: number,
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
