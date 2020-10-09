export default (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false;
  }
  const A: string[] = Array.prototype.slice.call(a).sort();
  const B: string[] = Array.prototype.slice.call(b).sort();
  return A.every((str, i) => B[i] === str);
};
