import { Chunker } from "./chunker";

export default async function* (
  input: AsyncIterable<Uint8Array>,
  size: number
) {
  const chunker = new Chunker(size);
  for await (const chunk of input) {
    const data = chunker.push(chunk);
    if (data != undefined) {
      yield data;
    }
  }
  return chunker.takeRemaining();
}
