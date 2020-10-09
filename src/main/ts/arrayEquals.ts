export default <V> (a: V[], b: V[]) => a.length === b.length && Array.prototype.every.call(a, (v, i) => v === b[i]);
