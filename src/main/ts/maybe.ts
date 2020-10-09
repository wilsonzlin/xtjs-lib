export default <V> (value: V, cond: (value: V) => any) => cond(value) ? value : undefined;
