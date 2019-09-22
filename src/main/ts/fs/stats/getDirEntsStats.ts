import {promises as fs} from "fs";
import * as Path from "path";
import { getStats } from "./getStats";
import { IStats } from "./IStats";

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
