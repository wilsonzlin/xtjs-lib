// https://en.wikipedia.org/wiki/Shoelace_formula
export default (points: [number, number][]) => {
  let red = 0;
  let blue = 0;
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    const [nextX, nextY] = points[i + 1] ?? points[0];
    red += x * nextY;
    blue += nextX * y;
  }
  return Math.abs(red - blue) / 2;
};
