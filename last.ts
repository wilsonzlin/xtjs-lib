// The return type isn't optional as the value at an index isn't optional in TS.
// However, in both cases the value is undefined if the array is empty.
export default <T>(seq: ArrayLike<T>): T => seq[seq.length - 1];
