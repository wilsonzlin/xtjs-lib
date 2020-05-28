export const minMax = (min: number, max: number, val: number): number => {
  return Math.max(min, Math.min(max, val));
};
