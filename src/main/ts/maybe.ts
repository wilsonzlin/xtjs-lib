export default <V> (value: V, cond: boolean | ((val: V) => boolean)) => (typeof cond == 'function' ? cond(value) : cond) ? value : undefined;
