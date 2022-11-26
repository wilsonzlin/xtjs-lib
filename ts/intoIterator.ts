import isIterable from "./isIterable";

export default <V>(src: Iterable<V> | Iterator<V>) =>
  isIterable<V>(src) ? src[Symbol.iterator]() : src;
