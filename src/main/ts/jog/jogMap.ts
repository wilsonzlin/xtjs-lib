import {splitPathIntoComponents} from "../util/splitPathIntoComponents";
import {PartialStats, STATS_FIELDS, StatsFields} from "../util/filterStats";
import {IJoggerOptions} from "./JoggerOptions";
import {jogTable} from "./jogTable";

export type JoggerMap<F extends StatsFields> = Map<string[], PartialStats<F>>;

export function jogMap<F extends StatsFields> ({dir, depth = Number.POSITIVE_INFINITY, fields = STATS_FIELDS}: IJoggerOptions<F>): Promise<JoggerMap<F>> {
  return jogTable<F>({dir, depth, fields})
    .then(table => {
      let map: JoggerMap<F> = new Map();
      Object.keys(table).forEach(path => {
        map.set(splitPathIntoComponents(path), table[path]);
      });
      return map;
    });
}
