export default <T>(vals: ArrayLike<T>, n: number): T[][] => {
  const chunks: T[][] = [];
  for (let offset = 0; offset < vals.length; ) {
    const chunk: T[] = [];
    for (let i = 0; i < n && offset < vals.length; i++, offset++) {
      chunk.push(vals[offset]);
    }
    chunks.push(chunk);
  }
  return chunks;
};
