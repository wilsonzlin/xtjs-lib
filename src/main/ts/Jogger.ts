import * as fs from "fs-extra";
import * as Path from "path";

interface IDirectoryEntry {
  name: string;
  stats: fs.Stats;
}

function getDirEntsStats(path: string): Promise<IDirectoryEntry[]> {
  return new Promise((resolve, reject) => {
    let ents: string[];

    fs.readdir(path)
      .then(_ents => {
        ents = _ents;
        return Promise.all(ents.map(e => fs.lstat(Path.join(path, e))));
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

export interface IJoggerOptions {
  dir: string;
  depth?: number;
}

export type JoggerTree = {
  [ent: string]: fs.Stats | JoggerTree | null;
}

export type JoggerComponents = string[][];

export type JoggerList = string[];

export function jogTree({ dir, depth = Number.POSITIVE_INFINITY }: IJoggerOptions): Promise<JoggerTree> {
  return new Promise((resolve, reject) => {
    let tree: JoggerTree = Object.create(null);
    let subdirs: string[] = [];

    getDirEntsStats(dir)
      .then(ents => {
        for (let { name, stats } of ents) {
          if (!stats.isDirectory()) {
            tree[name] = stats;
          } else {
            if (depth <= 1) {
              tree[name] = null;
            } else {
              subdirs.push(name);
            }
          }
        }

        return Promise.all(subdirs.map(d => jogTree({ dir: Path.join(dir, d), depth: depth - 1 })));
      })
      .then(subdirtrees => {
        subdirs.forEach((name, i) => {
          tree[name] = subdirtrees[i];
        });
        resolve(tree);
      })
      .catch(reject);
  });
}
