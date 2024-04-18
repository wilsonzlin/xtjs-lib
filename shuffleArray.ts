import randomInteger from "./randomInteger";

export default <T>(
  array: T[],
  rng: (minInc: number, maxInc: number) => number = randomInteger
): T[] => {
  for (let i = 0; i < array.length - 1; i++) {
    const j = rng(i, array.length - 1);
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
};
