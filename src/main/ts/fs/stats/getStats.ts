import fs from 'fs';
import {convertFromFS, IStats} from 'fs/stats/IStats';
import {asyncNullCatch} from '../../error/nullCatch';

export interface IGetStatsOptions {
  path: string;
  resolve?: boolean;
}

export const getStats = ({path, resolve: resolveSymlinks = false}: IGetStatsOptions): Promise<IStats> =>
  fs.promises[resolveSymlinks ? 'stat' : 'lstat'](path).then(convertFromFS);

export const getStatsSync = ({path, resolve: resolveSymlinks = false}: IGetStatsOptions): IStats =>
  convertFromFS(fs[resolveSymlinks ? 'statSync' : 'lstatSync'](path));

export const nullStat = asyncNullCatch(fs.stat, 'ENOENT');

export const isFile = async (path: string): Promise<boolean> => !!(await nullStat(path))?.isFile();

export const isDirectory = async (path: string): Promise<boolean> => !!(await nullStat(path))?.isDirectory();
