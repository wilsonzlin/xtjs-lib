export default <T, R>(val: T, mapper: (val: T) => R) => mapper(val);
