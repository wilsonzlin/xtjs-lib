export default (minInc: number, maxInc: number) =>
  Math.floor(Math.random() * (maxInc - minInc + 1)) + minInc;
