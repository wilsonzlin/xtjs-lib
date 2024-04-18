import sRgbToLinearRgb from "./sRgbToLinearRgb";

/**
 * Converts RGB color to CIE 1931 XYZ color space.
 * https://www.image-engineering.de/library/technotes/958-how-to-convert-between-srgb-and-ciexyz
 */
export default (r: number, g: number, b: number): [number, number, number] => {
  [r, g, b] = [r, g, b]
    .map((component) => component / 255)
    .map(sRgbToLinearRgb);
  const X = 0.4124 * r + 0.3576 * g + 0.1805 * b;
  const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const Z = 0.0193 * r + 0.1192 * g + 0.9505 * b;
  return [X, Y, Z];
};
