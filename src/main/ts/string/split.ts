export const segment = (str: string, n: number): string[] => {
  const parts = Array(Math.ceil(str.length / n));
  for (let i = 0; i < n; i++) {
    parts[i] = str.slice(i * n, (i + 1) * n);
  }
  return parts;
};

export const emptySplit = (str: string, split: string | RegExp, limit?: number): string[] => !str.length ? [] : str.split(split, limit);
