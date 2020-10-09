type SortablePrimitive = number | string | boolean;

export default <T extends SortablePrimitive>(a: T, b: T) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};
