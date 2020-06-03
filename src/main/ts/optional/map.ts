/*
 * The mapping functions in this file (and similar ones across this library) do not take
 * a second fallback value or function, as it's expected that the builtin nullish
 * coalescing operator will be used instead.
 */

export const mapOptional = <T, R> (val: T | null | undefined, mapper: (val: T) => R) => val == null ? undefined : mapper(val);

export const mapDefined = <V, R> (val: V | undefined, mapper: (val: V) => R): R | undefined => val === undefined ? undefined : mapper(val);
