export default <T> (sliceable: { slice: (start: number, end: number) => T, length: number }, n: number): T[] => {
  const chunks = Array(Math.ceil(sliceable.length / n));
  for (let i = 0; i < n; i++) {
    chunks[i] = sliceable.slice(i * n, (i + 1) * n);
  }
  return chunks;
};
