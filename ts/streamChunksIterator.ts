import Chunker from "./chunker";

export default async function* (
  input: AsyncIterable<Uint8Array>,
  size: number
) {
  const chunker = new Chunker(size);
  for await (const chunk of input) {
    yield* chunker.push(chunk);
  }
  return chunker.takeRemaining();
}
