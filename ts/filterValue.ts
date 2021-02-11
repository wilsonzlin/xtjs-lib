// We cannot have an overload like `<V>(value: unknown, cond: (v: unknown) => v is V): V | undefined`
// as it would always override this one (and vice versa).
// A good alternative is `mapValue(complex + exp.ress(ion), v => typePred(v) ? v : undefined)`.
export default <V>(value: V, cond: (value: V) => any): V | undefined =>
  cond(value) ? value : undefined;
