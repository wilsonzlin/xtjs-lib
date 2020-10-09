// Calculate the perceived brightness of an RGB colour on a scale from 0 (darkest) to 1 (brightest).
export default (r: number, g: number, b: number) =>
  (0.299 * r + 0.587 * g + 0.114 * b) / 255;
