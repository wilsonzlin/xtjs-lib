import * as Path from "path";
import {getDirEntsStats} from "../util/getDirEntsStats";
import {filterStats, PartialStats, STATS_FIELDS, StatsFields} from "../util/filterStats";
import {IJoggerOptions} from "./JoggerOptions";

export type JoggerTable<F extends StatsFields> = {
  [path: string]: PartialStats<F>;
};

export function jogTable<F extends StatsFields> ({dir, depth = Number.POSITIVE_INFINITY, fields = STATS_FIELDS}: IJoggerOptions<F>): Promise<JoggerTable<F>> {
  return new Promise((resolve, reject) => {
    let table: JoggerTable<F> = Object.create(null);
    let subdirNames: string[] = [];

    getDirEntsStats(dir)
      .then(ents => {
        for (let {name, stats} of ents) {
          // Check .directory before filtering
          if (stats.directory && depth > 1) {
            subdirNames.push(name);
          }
          table[name] = filterStats<F>(stats, fields);
        }

        return Promise.all(subdirNames.map(d => jogTable<F>({dir: Path.join(dir, d), depth: depth - 1})));
      })
      .then(subdirTables => {
        subdirTables.forEach((subdirTable, i) => {
          Object.keys(subdirTable).forEach(subdirEntryName => {
            table[Path.join(subdirNames[i], subdirEntryName)] = subdirTable[subdirEntryName];
          });
        });

        resolve(table);
      })
      .catch(reject);
  });
}
