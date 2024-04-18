export default (component: number) =>
  component <= 0.04045
    ? component / 12.92
    : Math.pow((component + 0.055) / 1.055, 2.4);
