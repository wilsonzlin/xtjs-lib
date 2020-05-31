import {promises as fs} from 'fs';
import {getStats} from 'fs/stats/getStats';
import {IStats} from 'fs/stats/IStats';
import * as Path from 'path';

export interface IDirectoryEntry {
  name: string;
  stats: IStats;
}

export const getDirEntsStats = async (path: string): Promise<IDirectoryEntry[]> => {
  const ents = await fs.readdir(path);
  const stats = await Promise.all(ents.map(e => getStats({path: Path.join(path, e)})));
  return ents.map((e, i) => ({
    name: e,
    stats: stats[i],
  }));
};
