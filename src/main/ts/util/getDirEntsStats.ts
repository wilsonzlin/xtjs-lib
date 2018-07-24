import * as fs from "fs-extra";
import * as Path from "path";
import * as normstat from "normstat";

export interface IDirectoryEntry {
  name: string;
  stats: normstat.IStats;
}

export function getDirEntsStats(path: string): Promise<IDirectoryEntry[]> {
  return new Promise((resolve, reject) => {
    let ents: string[];

    fs.readdir(path)
      .then(_ents => {
        ents = _ents;
        return Promise.all(ents.map(e => normstat.getStats({ path: Path.join(path, e) })));
      })
      .then(stats => {
        resolve(ents.map((e, i) => ({
          name: e,
          stats: stats[i],
        })));
      })
      .catch(reject);
  });
}
