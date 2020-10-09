export const mapNonNegative = <R>(val: number, mapper: (val: number) => R) => val < 0 ? undefined : mapper(val);
