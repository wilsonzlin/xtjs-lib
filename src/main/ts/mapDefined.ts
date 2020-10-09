export default <V, R> (val: V | undefined, mapper: (val: V) => R): R | undefined => val === undefined ? undefined : mapper(val);
