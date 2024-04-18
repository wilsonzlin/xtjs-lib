export default <T>(
  sliceable: {
    slice(start: number, end: number): T;
    length: number;
  },
  n: number
): T[] => {
  const slices = [];
  for (let offset = 0; offset < sliceable.length; ) {
    slices.push(sliceable.slice(offset, (offset += n)));
  }
  return slices;
};
