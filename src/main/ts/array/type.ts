export const isArrayOfType = <TStr extends 'string' | 'number' | 'boolean'>(arr: unknown, type: TStr): arr is (
  TStr extends 'string' ? string
    : TStr extends 'number' ? number
    : TStr extends 'boolean' ? boolean
      : never
  )[] => {
  return Array.isArray(arr) && arr.every(val => typeof val == type);
};
