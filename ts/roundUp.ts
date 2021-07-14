export const roundUp = (val: number, multiple = 1) =>
  Math.ceil(val / multiple) * multiple;
