// X, Y, Z of a "D65" light source.
// "D65" is a standard 6500K Daylight light source.
// https://en.wikipedia.org/wiki/Illuminant_D65
const D65 = [95.047, 100, 108.883];

/**
 * Converts CIE 1931 XYZ colors to CIE L*a*b*.
 * http://www.easyrgb.com/en/math.php
 */
export default (x: number, y: number, z: number): [number, number, number] => {
  [x, y, z] = [x, y, z].map((v, i) => {
    v = v / D65[i];
    return v > 0.008856 ? Math.pow(v, 1 / 3) : v * 7.787 + 16 / 116;
  });
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
};
