import {splitPathIntoComponents} from "fs/path/splitPathIntoComponents";
import {PartialStats, STATS_FIELDS, StatsFields} from "fs/stats/filterStats";
import {IJoggerOptions} from "fs/tree/JoggerOptions";
import {jogTable} from "fs/tree/jogTable";

export type JoggerMap<F extends StatsFields> = Map<string[], PartialStats<F>>;

export const jogMap = async <F extends StatsFields> (
  {
    dir,
    depth = Number.POSITIVE_INFINITY,
    fields = STATS_FIELDS
  }: IJoggerOptions<F>
): Promise<JoggerMap<F>> => {
  const table = await jogTable<F>({dir, depth, fields});
  const map: JoggerMap<F> = new Map();
  Object.keys(table).forEach(path => {
    map.set(splitPathIntoComponents(path), table[path]);
  });
  return map;
};
