export default <V>(ary: V[], prefix: V[]): boolean =>
  prefix.length <= ary.length &&
  Array.prototype.every.call(prefix, (v, i) => v === ary[i]);
