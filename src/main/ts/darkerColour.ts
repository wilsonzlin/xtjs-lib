// Darken RGB by fraction (from 0 to 1).
export default (r: number, g: number, b: number, fraction: number) => [
  Math.max(0, Math.round(r - 255 * fraction)),
  Math.max(0, Math.round(g - 255 * fraction)),
  Math.max(0, Math.round(b - 255 * fraction)),
] as const;
