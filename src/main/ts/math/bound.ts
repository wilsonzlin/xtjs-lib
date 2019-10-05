export const bound = (num: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, num));
};
