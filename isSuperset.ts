import every from "./every";

export default <T>(sup: Set<T> | T[], full: Set<T> | T[]) =>
  every(full, (val) => (Array.isArray(sup) ? sup.includes(val) : sup.has(val)));
