export default (str: string, split: string | RegExp, limit?: number): string[] => !str.length ? [] : str.split(split, limit);
