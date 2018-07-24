import * as Path from "path";
import {getDirEntsStats} from "../util/getDirEntsStats";
import {IJoggerOptions} from "./JoggerOptions";
import {filterStats, PartialStats, STATS_FIELDS, StatsFields} from "../util/filterStats";

export type JoggerTree<F extends StatsFields> = {
  [ent: string]: PartialStats<F> | JoggerTree<F> | null;
}

export function jogTree<F extends StatsFields> ({dir, depth = Number.POSITIVE_INFINITY, fields = STATS_FIELDS}: IJoggerOptions<F>): Promise<JoggerTree<F>> {
  return new Promise((resolve, reject) => {
    let tree: JoggerTree<F> = Object.create(null);
    let subdirNames: string[] = [];

    getDirEntsStats(dir)
      .then(ents => {
        for (let {name, stats} of ents) {
          // Check .directory before filtering
          if (!stats.directory) {
            tree[name] = filterStats(stats, fields);
          } else {
            if (depth <= 1) {
              tree[name] = null;
            } else {
              subdirNames.push(name);
            }
          }
        }

        return Promise.all(subdirNames.map(d => jogTree<F>({dir: Path.join(dir, d), depth: depth - 1})));
      })
      .then(subdirTrees => {
        subdirNames.forEach((name, i) => {
          tree[name] = subdirTrees[i];
        });

        resolve(tree);
      })
      .catch(reject);
  });
}
