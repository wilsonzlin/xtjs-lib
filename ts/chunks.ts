export default <T>(
  sliceable: { slice: (start: number, end: number) => T; length: number },
  n: number
): T[] => {
  const chunks = [];
  for (let offset = 0; offset < sliceable.length; ) {
    chunks.push(sliceable.slice(offset, (offset += n)));
  }
  return chunks;
};
