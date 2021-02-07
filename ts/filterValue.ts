export default function <V>(
  value: unknown,
  cond: (value: unknown) => value is V
): V | undefined;
export default function <V>(
  value: V,
  cond: (value: V) => boolean
): V | undefined;
export default function <V>(value: V, cond: (value: V) => any): V | undefined {
  return cond(value) ? value : undefined;
}
