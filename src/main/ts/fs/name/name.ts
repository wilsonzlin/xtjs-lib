import * as path from 'path';

const getExtPos = (name: string): number => name.lastIndexOf('.', name.lastIndexOf(path.sep) + 1);

export const getExt = (name: string): string => {
  const lastDot = getExtPos(name);
  return lastDot === -1 ? '' : name.slice(lastDot + 1);
};

export const withoutExt = (name: string): string => {
  const lastDot = getExtPos(name);
  return lastDot === -1 ? name : name.slice(0, lastDot);
};
