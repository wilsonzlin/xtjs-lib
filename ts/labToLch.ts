import radToDeg from "./radToDeg";
import UnreachableError from "./UnreachableError";

/**
 * Converts a and b of Lab color space to Hue of LCH color space.
 * https://stackoverflow.com/questions/53733379/conversion-of-cielab-to-cielchab-not-yielding-correct-result
 */
const abToHue = (a: number, b: number) => {
  if (a >= 0 && b === 0) {
    return 0;
  }
  if (a < 0 && b === 0) {
    return 180;
  }
  if (a === 0 && b > 0) {
    return 90;
  }
  if (a === 0 && b < 0) {
    return 270;
  }
  let xBias;
  if (a > 0 && b > 0) {
    xBias = 0;
  } else if (a < 0) {
    xBias = 180;
  } else if (a > 0 && b < 0) {
    xBias = 360;
  } else {
    throw new UnreachableError();
  }
  return radToDeg(Math.atan(b / a)) + xBias;
};

/**
 * Converts Lab color space to Luminance-Chroma-Hue color space.
 * http://www.brucelindbloom.com/index.html?Eqn_Lab_to_LCH.html
 */
export default (l: number, a: number, b: number): [number, number, number] => {
  const c = Math.sqrt(a * a + b * b);
  const h = abToHue(a, b);
  return [l, c, h];
};
