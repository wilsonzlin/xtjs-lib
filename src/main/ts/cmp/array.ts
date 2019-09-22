export function subsetArray (sub: any[], full: any[]): boolean {
  return sub.every(s => full.includes(s));
}

export function supersetArray (sup: any[], full: any[]): boolean {
  return full.every(f => sup.includes(f));
}
