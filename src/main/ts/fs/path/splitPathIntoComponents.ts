import {sep} from 'path';

export const splitPathIntoComponents = (path: string, separator: string | RegExp = sep): string[] => {
  return path.split(separator).filter(c => c);
};
