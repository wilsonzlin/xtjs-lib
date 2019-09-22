export type SortablePrimitive = number | string | boolean;

export function compareNatively<T extends SortablePrimitive> (a: T, b: T): number {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}
