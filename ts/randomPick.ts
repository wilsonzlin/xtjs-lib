import randomInteger from "./randomInteger";

export default <T>(values: ArrayLike<T>): T =>
  values[randomInteger(0, values.length - 1)];
