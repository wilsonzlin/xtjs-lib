import {normalize, RGB, RGBArray} from "color/rgb";

// Calculate the perceived brightness of an RGB colour on a scale from 0 (darkest) to 1 (brightest).
export const perceivedBrightness = (rgb: RGB): number => {
  const [r, g, b] = normalize(rgb);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

export const isLight = (rgb: RGB): boolean => {
  return perceivedBrightness(rgb) > 0.5;
};

// Darken RGB by fraction (from 0 to 1).
export const darken = (rgb: RGB, fraction: number): RGBArray => {
  const [r, g, b] = normalize(rgb);

  return [
    Math.max(0, Math.round(r - 255 * fraction)),
    Math.max(0, Math.round(g - 255 * fraction)),
    Math.max(0, Math.round(b - 255 * fraction)),
  ];
};

// Lighten RGB by fraction (from 0 to 1).
export const lighten = (rgb: RGB, fraction: number): RGBArray => {
  const [r, g, b] = normalize(rgb);

  return [
    Math.min(255, Math.round(r + 255 * fraction)),
    Math.min(255, Math.round(g + 255 * fraction)),
    Math.min(255, Math.round(b + 255 * fraction)),
  ];
};
