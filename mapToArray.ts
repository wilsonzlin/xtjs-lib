import map from "./map";

export default function <T, R>(src: readonly [], mapper: (t: T) => R): [];
export default function <T, R>(src: readonly [T], mapper: (t: T) => R): [R];
export default function <T, R>(
  src: readonly [T, T],
  mapper: (t: T) => R
): [R, R];
export default function <T, R>(
  src: readonly [T, T, T],
  mapper: (t: T) => R
): [R, R, R];
export default function <T, R>(
  src: readonly [T, T, T, T],
  mapper: (t: T) => R
): [R, R, R, R];
export default function <T, R>(
  src: readonly [T, T, T, T, T],
  mapper: (t: T) => R
): [R, R, R, R, R];
export default function <T, R>(
  src: readonly [T, T, T, T, T, T],
  mapper: (t: T) => R
): [R, R, R, R, R, R];
export default function <T, R>(
  src: readonly [T, T, T, T, T, T, T],
  mapper: (t: T) => R
): [R, R, R, R, R, R, R];
export default function <T, R>(
  src: readonly [T, T, T, T, T, T, T, T],
  mapper: (t: T) => R
): [R, R, R, R, R, R, R, R];
export default function <T, R>(
  src: readonly [T, T, T, T, T, T, T, T, T],
  mapper: (t: T) => R
): [R, R, R, R, R, R, R, R, R];
export default function <T, R>(
  src: readonly [T, T, T, T, T, T, T, T, T, T],
  mapper: (t: T) => R
): [R, R, R, R, R, R, R, R, R, R];
export default function <T, R>(src: Iterable<T>, mapper: (t: T) => R): R[] {
  return Array.from(map(src, mapper));
}
