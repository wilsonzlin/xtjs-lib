import Dict from "./Dict";

export default <K, T>(loose: Iterable<T>, key: (val: T) => K) => {
  const groups = new Dict<K, T[]>();
  for (const val of loose) {
    groups.computeIfAbsent(key(val), () => []).push(val);
  }
  return groups;
};
