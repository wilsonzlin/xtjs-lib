import Dict from "./Dict";

export default <T extends {}, P extends keyof T>(
  loose: Iterable<T>,
  prop: P
) => {
  const groups = new Dict<T[P], Omit<T, P>[]>();
  for (const { [prop]: propValue, ...obj } of loose) {
    groups.computeIfAbsent(propValue, () => []).push(obj);
  }
  return groups;
};
