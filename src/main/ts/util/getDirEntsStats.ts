import * as fs from "fs-extra";
import * as Path from "path";
import * as normstat from "normstat";

export interface IDirectoryEntry {
  name: string;
  stats: normstat.IStats;
}

export const getDirEntsStats = async (path: string): Promise<IDirectoryEntry[]> => {
  const ents = await fs.readdir(path);
  const stats = await Promise.all(ents.map(e => normstat.getStats({path: Path.join(path, e)})));
  return ents.map((e, i) => ({
    name: e,
    stats: stats[i],
  }));
};
