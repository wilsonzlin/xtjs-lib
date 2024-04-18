import degToRad from "./degToRad";
import labToLch from "./labToLch";
import mapToArray from "./mapToArray";
import rgbToXyz from "./rgbToXyz";
import xyzToLab from "./xyzToLab";

// Calculate the perceived brightness of an RGB colour on a scale from 0 (darkest) to 1 (brightest).
export default (r: number, g: number, b: number) => {
  const [l, c, h] = labToLch(
    ...xyzToLab(...mapToArray(rgbToXyz(r, g, b), (v) => v * 100))
  );
  return (
    (l +
      (2.5 - 0.025 * l) *
        (0.116 * Math.abs(Math.sin(degToRad((h - 90) / 2))) + 0.085) *
        c) /
    100
  );
};
