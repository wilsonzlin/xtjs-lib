// Lighten RGB by fraction (from 0 to 1).
export default (r: number, g: number, b: number, fraction: number) =>
  [
    Math.min(255, Math.round(r + 255 * fraction)),
    Math.min(255, Math.round(g + 255 * fraction)),
    Math.min(255, Math.round(b + 255 * fraction)),
  ] as const;
