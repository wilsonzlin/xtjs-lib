import * as Path from "path";
import {getDirEntsStats} from "../util/getDirEntsStats";
import {filterStats, PartialStats, STATS_FIELDS, StatsFields} from "../util/filterStats";
import {IJoggerOptions} from "./JoggerOptions";

export type JoggerTable<F extends StatsFields> = {
  [path: string]: PartialStats<F>;
};

export const jogTable = async <F extends StatsFields> (
  {
    dir,
    depth = Number.POSITIVE_INFINITY,
    fields = STATS_FIELDS
  }: IJoggerOptions<F>
): Promise<JoggerTable<F>> => {
  let table: JoggerTable<F> = Object.create(null);
  let subdirNames: string[] = [];

  const ents = await getDirEntsStats(dir);
  for (let {name, stats} of ents) {
    // Check .directory before filtering
    if (stats.directory && depth > 1) {
      subdirNames.push(name);
    }
    table[name] = filterStats<F>(stats, fields);
  }

  const subdirTables = await Promise.all(subdirNames.map(d => jogTable<F>({dir: Path.join(dir, d), depth: depth - 1})));
  subdirTables.forEach((subdirTable, i) => {
    Object.keys(subdirTable).forEach(subdirEntryName => {
      table[Path.join(subdirNames[i], subdirEntryName)] = subdirTable[subdirEntryName];
    });
  });

  return table;
};
